package com.zaraclone.backend.controllers;

import com.zaraclone.backend.dtos.request.LoginRequest;
import com.zaraclone.backend.dtos.request.RegisterUserRequest;
import com.zaraclone.backend.dtos.response.AuthDto;
import com.zaraclone.backend.dtos.response.GetCodeResponse;
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

    private void setCookie(HttpServletResponse response, String token) {
        ResponseCookie cookie = ResponseCookie.from(cookieName, token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(Duration.ofHours(expiresIn))
                .sameSite(SameSiteCookies.LAX.toString())
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    @PostMapping("/login")
    public ResponseEntity<AuthDto> login(
            @RequestBody LoginRequest request,
            HttpServletResponse response
    ) {
        AuthDto resp = authService.login(request);
        setCookie(response, resp.getToken());

        return ResponseEntity.ok(resp);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthDto> createUser(@RequestBody RegisterUserRequest request, HttpServletResponse response) {
        AuthDto resp = authService.register(request);
        setCookie(response, resp.getToken());
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from(cookieName, "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite(SameSiteCookies.LAX.toString())
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<UserDto> getCurrentUser() {
        var user = authService.getCurrentUser();
        return ResponseEntity.ok(userMapper.toDto(user));
    }

    @GetMapping("/register/{email}")
    public ResponseEntity<GetCodeResponse> getRegisterCode(@PathVariable String email) {
        var code = authService.getRegisterCode(email);
        return ResponseEntity.ok(code);
    }

    @GetMapping("/reset/{email}")
    public ResponseEntity<GetCodeResponse> getResetCode(@PathVariable String email) {
        var code = authService.getCode(email);
        return ResponseEntity.ok(code);
    }
}
