package com.zaraclone.backend.services;

import com.zaraclone.backend.dtos.request.LoginRequest;
import com.zaraclone.backend.dtos.request.RegisterUserRequest;
import com.zaraclone.backend.dtos.response.AuthDto;
import com.zaraclone.backend.dtos.response.GetCodeResponse;
import com.zaraclone.backend.dtos.response.UserDto;
import com.zaraclone.backend.entities.User;
import com.zaraclone.backend.enums.Role;
import com.zaraclone.backend.mappers.UserMapper;
import com.zaraclone.backend.repositories.UserRepository;
import com.zaraclone.backend.utils.VerificationCodeGenerator;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final JwtService jwtService;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final EmailService emailService;

    private AuthDto authenticateUser(String email, String password) {
        var authObject = new UsernamePasswordAuthenticationToken(
                email,
                password
        );
        authenticationManager.authenticate(
                authObject
        );
        var user = userRepository.findByEmail(email).orElseThrow(
                () -> new EntityNotFoundException("User not found with email: " + email)
        );
        var jwtToken = jwtService.generateToken(user);
        return new AuthDto(jwtToken,userMapper.toDto(user));
    }

    public AuthDto login(LoginRequest request) {
        return authenticateUser(request.getEmail(), request.getPassword());
    }

    public AuthDto register(RegisterUserRequest request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("Email not found or not requested verification");
        }

        User user = optionalUser.get();

        if (user.getVerificationDate() != null) {
            throw new IllegalArgumentException("User already exists with email: " + request.getEmail());
        }

        boolean isCodeInvalid = !request.getVerificationCode().equals(user.getVerificationCode());
        boolean isCodeExpired = user.getVerificationExpiry().before(new Timestamp(System.currentTimeMillis()));

        if (isCodeInvalid || isCodeExpired) {
            throw new IllegalArgumentException("Invalid or expired verification code");
        }

        user.setVerificationDate(new Timestamp(System.currentTimeMillis()));
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        user.setName(request.getName());
        userRepository.save(user);
        return authenticateUser(request.getEmail(), request.getPassword());
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AccessDeniedException("User is not authenticated");
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof User) {
            return (User) principal;
        }

        throw new AccessDeniedException("Invalid user principal");
    }

    public GetCodeResponse getCode(String email) {
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + email));

        var code = VerificationCodeGenerator.generateVerificationCode();
        user.setVerificationCode(code);
        user.setVerificationExpiry(new Timestamp(System.currentTimeMillis() + 1000 * 60 * 10));
        userRepository.save(user);
        emailService.sendEmail(email, "Verification Code", "Your verification code is: " + code);
        return new GetCodeResponse("Successfully sent verification code to " + email);
    }

    public GetCodeResponse getRegisterCode(String email) {

        var code = VerificationCodeGenerator.generateVerificationCode();
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(email);
            return newUser;
        });
        user.setEmail(email);
        user.setVerificationCode(code);
        user.setVerificationExpiry(new Timestamp(System.currentTimeMillis() + 1000 * 60 * 10));
        userRepository.save(user);
        emailService.sendEmail(email, "Verification Code", "Your verification code is: " + code);
        return new GetCodeResponse("Successfully sent verification code to " + email);
    }

}
