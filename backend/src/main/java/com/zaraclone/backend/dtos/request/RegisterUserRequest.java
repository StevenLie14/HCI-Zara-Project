package com.zaraclone.backend.dtos.request;

import com.zaraclone.backend.enums.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserRequest {
    private String name;
    private String email;
    private String password;
    private Role role = Role.USER;
}
