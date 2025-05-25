package com.zaraclone.backend.controllers;


import com.zaraclone.backend.dtos.request.ChangePasswordRequest;
import com.zaraclone.backend.dtos.request.UpdateUserRequest;
import com.zaraclone.backend.dtos.response.UserDto;
import com.zaraclone.backend.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<Iterable<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable String id) {
       var user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PatchMapping(path = "/profile",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateProfilePicture(
            @RequestPart("profilePicture") MultipartFile file
    ) {
        userService.updateProfilePicture(file);
        return ResponseEntity.status(HttpStatus.CREATED).body("Profile picture updated successfully");
    }

    @PutMapping()
    public ResponseEntity<UserDto> updateUser(@RequestBody UpdateUserRequest request) {
        return ResponseEntity.ok(userService.updateUser(request));
    }

    @PatchMapping("/change-password")
    public ResponseEntity<Void> changePassword(@RequestBody ChangePasswordRequest password) {
        userService.changePassword(password);
        return ResponseEntity.noContent().build();
    }



}
