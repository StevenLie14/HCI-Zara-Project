package com.zaraclone.backend.config;

import com.zaraclone.backend.services.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.*;

import static com.zaraclone.backend.config.SecurityConfig.AUTHORIZE_LIST_URL;
import static com.zaraclone.backend.config.SecurityConfig.AUTH_RULES;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final AntPathMatcher pathMatcher = new AntPathMatcher();

    @Value("${app.cookie.name}")
    private String cookieName;

    private String getTokenFromCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (!Objects.isNull(cookies)) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(cookieName)) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        HttpMethod method = HttpMethod.valueOf(request.getMethod());
        boolean isInAuthorizeList = Arrays.stream(AUTHORIZE_LIST_URL)
                .anyMatch(pattern -> pathMatcher.match(pattern, path));

        boolean isInAuthRules = AUTH_RULES.getOrDefault(method, List.of()).stream()
                .anyMatch(pattern -> pathMatcher.match(pattern, path));

        return !(isInAuthorizeList || isInAuthRules);
    }

    private void clearJwtCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie(cookieName, "");
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    private void sendJsonError(HttpServletResponse response, String message) {
        try {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            String json = String.format("{\"error\": \"%s\"}", message);
            response.getWriter().write(json);
        } catch (IOException ioException) {
            ioException.fillInStackTrace();
        }
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }
//        USING AUTHORIZATION HEADER
//        final String authHeader = request.getHeader("Authorization");
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//        jwt = authHeader.substring(7);
        final String jwt;
        final String email;

        jwt = getTokenFromCookies(request);
        if (jwt == null) {
            filterChain.doFilter(request, response);
            return;
        }

        try {

            email = jwtService.extractEmail(jwt);
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (email != null && authentication == null) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(email);

                if (jwtService.validateToken(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContext securityContext = SecurityContextHolder.getContext();
                    securityContext.setAuthentication(authToken);
                }
            }
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException ex) {
            clearJwtCookie(response);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            sendJsonError(response, "JWT expired");
            ex.fillInStackTrace();
        } catch (JwtException ex) {
            clearJwtCookie(response);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            sendJsonError(response, "Invalid JWT");
            ex.fillInStackTrace();
        } catch (UsernameNotFoundException e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            sendJsonError(response, "Unauthorized: User not found");
            e.fillInStackTrace();
        } catch (AccessDeniedException e) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            sendJsonError(response, "Forbidden: Access denied");
            e.fillInStackTrace();
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            sendJsonError(response, "Unauthorized");
            e.fillInStackTrace();
        }


    }
}
