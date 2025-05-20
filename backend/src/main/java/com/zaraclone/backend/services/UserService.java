package com.zaraclone.backend.services;

import com.zaraclone.backend.dtos.request.ChangePasswordRequest;
import com.zaraclone.backend.entities.User;
import com.zaraclone.backend.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void changePassword(String userId, ChangePasswordRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (!user.getPassword().equals(request.getOldPassword())) {
            throw new IllegalArgumentException("Old password does not match");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        try {
            userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update password", e);
        }
    }
}
