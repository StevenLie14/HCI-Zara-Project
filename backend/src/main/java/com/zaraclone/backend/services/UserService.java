package com.zaraclone.backend.services;

import com.zaraclone.backend.dtos.request.ChangePasswordRequest;
import com.zaraclone.backend.dtos.request.UpdateUserRequest;
import com.zaraclone.backend.dtos.response.UserDto;
import com.zaraclone.backend.mappers.UserMapper;
import com.zaraclone.backend.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public void changePassword(ChangePasswordRequest request) {
        var user = userRepository.findByEmail(request.getEmail())
                .filter(u -> u.getVerificationDate() != null)
                .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + request.getEmail()));

        if (!request.getVerificationCode().equals(user.getVerificationCode()) ||
                user.getVerificationExpiry().before(new Timestamp(System.currentTimeMillis()))) {
            throw new IllegalArgumentException("Invalid or expired verification code");
        }
        if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("New password cannot be the same as the old password");
        }
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toDto).toList();
    }

    public UserDto getUserById(String id) {
        return userRepository.findById(id)
                .map(userMapper::toDto)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + id));
    }

    public UserDto updateUser (String id, UpdateUserRequest request) {
        var user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + id));
        userMapper.update(request, user);
        return userMapper.toDto(user);
    }



}
