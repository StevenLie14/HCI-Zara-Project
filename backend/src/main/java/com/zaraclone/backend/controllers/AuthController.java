package com.zaraclone.backend.controllers;

import com.zaraclone.backend.dtos.request.LoginRequest;
import com.zaraclone.backend.dtos.request.RegisterUserRequest;
import com.zaraclone.backend.dtos.response.AuthDto;
import com.zaraclone.backend.dtos.response.UserDto;
import com.zaraclone.backend.mappers.UserMapper;
import com.zaraclone.backend.services.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.SameSiteCookies;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    @Value("${app.cookie.name}")
    private String cookieName;

    @Value("${app.cookie.expires-in}")
    private int expiresIn;
    private final AuthService authService;
    private final UserMapper userMapper;

    @PostMapping("/login")
    public ResponseEntity<AuthDto> login(
            @RequestBody LoginRequest request,
            HttpServletResponse response
    ) {
        var resp = authService.login(request);
        ResponseCookie cookie = ResponseCookie.from(cookieName, resp.getToken())
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(Duration.ofHours(expiresIn))
                .sameSite(SameSiteCookies.LAX.toString())
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(resp);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> createUser(@RequestBody RegisterUserRequest request) {
        UserDto dto = authService.register(request);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<UserDto> getCurrentUser() {
        var user = authService.getCurrentUser();
        return ResponseEntity.ok(userMapper.toDto(user));
    }
}
