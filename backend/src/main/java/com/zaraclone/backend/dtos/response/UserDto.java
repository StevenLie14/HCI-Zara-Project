package com.zaraclone.backend.dtos.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.zaraclone.backend.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.sql.Date;
import java.sql.Timestamp;

@AllArgsConstructor
@Getter
public class UserDto {
    private String id;
    private String name;
    private String email;
    private Role role;
    private String phone;
    private String profilePicture;
    private String gender;
    private String birthDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private String verificationDate;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private String createdAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private String updatedAt;
}
