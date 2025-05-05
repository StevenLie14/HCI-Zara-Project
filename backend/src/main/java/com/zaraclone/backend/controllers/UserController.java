package com.zaraclone.backend.controllers;


import com.zaraclone.backend.dtos.request.ChangePasswordRequest;
import com.zaraclone.backend.dtos.request.RegisterUserRequest;
import com.zaraclone.backend.dtos.request.UpdateUserRequest;
import com.zaraclone.backend.dtos.response.UserDto;
import com.zaraclone.backend.mappers.UserMapper;
import com.zaraclone.backend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<Iterable<UserDto>> getAllUsers() {
        return ResponseEntity.ok(
                userRepository
                    .findAll()
                    .stream()
                    .map(userMapper::toDto).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable String id) {
       var user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userMapper.toDto(user));
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody RegisterUserRequest request) {
        request.setPassword(passwordEncoder.encode(request.getPassword()));
        System.out.println(request);
        var user = userMapper.toEntity(request);
        user = userRepository.save(user);
        return ResponseEntity.ok(userMapper.toDto(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable String id, @RequestBody UpdateUserRequest request) {
        var user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        userMapper.update(request,user);
        return ResponseEntity.ok(userMapper.toDto(user));
    }

    @PostMapping("/{id}/password")
    public ResponseEntity<Void> changePassword(@PathVariable String id, @RequestBody ChangePasswordRequest password) {
        var user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        if (!user.getPassword().equals(password.getOldPassword())) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        user.setPassword(password.getNewPassword());
        userRepository.save(user);
        return ResponseEntity.noContent().build();
    }



}
