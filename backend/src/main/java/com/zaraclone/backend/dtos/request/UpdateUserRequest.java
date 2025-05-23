package com.zaraclone.backend.dtos.request;

import lombok.Data;

import java.sql.Date;
import java.sql.Timestamp;

@Data
public class UpdateUserRequest {
    private String username;
    private String email;
    private String gender;
    private String phone;
    private Timestamp verificationDate;
    private Date birthDate;
    private String profilePicture;
}
