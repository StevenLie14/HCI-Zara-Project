package com.zaraclone.backend.services;

import com.zaraclone.backend.dtos.request.LoginRequest;
import com.zaraclone.backend.dtos.response.AuthDto;
import com.zaraclone.backend.mappers.UserMapper;
import com.zaraclone.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final JwtService jwtService;
    private final UserMapper userMapper;

    private final UserRepository userRepository;

    public AuthDto login(LoginRequest request) {

        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return new AuthDto(jwtToken,userMapper.toDto(user));
    }
}
