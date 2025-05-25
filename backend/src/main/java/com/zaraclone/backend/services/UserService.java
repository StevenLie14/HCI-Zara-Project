package com.zaraclone.backend.services;

import com.zaraclone.backend.dtos.request.ChangePasswordRequest;
import com.zaraclone.backend.dtos.request.UpdateUserRequest;
import com.zaraclone.backend.dtos.response.UserDto;
import com.zaraclone.backend.exceptions.FileUploadException;
import com.zaraclone.backend.mappers.UserMapper;
import com.zaraclone.backend.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final AuthService authService;
    private final MinioService minioService;

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
        user.setVerificationExpiry(new Timestamp(System.currentTimeMillis()));
        userRepository.save(user);
    }

    public void updateProfilePicture(MultipartFile file){
        var user = authService.getCurrentUser();
        var imageToDelete = user.getProfilePicture();
        try {
            minioService.uploadFile(file.getOriginalFilename(), file.getInputStream(), file.getContentType());
            if (imageToDelete != null) {
                minioService.deleteFile(imageToDelete);
            }
        } catch (Exception e) {
            throw new FileUploadException("Failed to upload image", e);
        }
        user.setProfilePicture(file.getOriginalFilename());
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

    public UserDto updateUser (UpdateUserRequest request) {
        var user = authService.getCurrentUser();
        userMapper.update(request, user);
        userRepository.save(user);
        return userMapper.toDto(user);
    }



}
