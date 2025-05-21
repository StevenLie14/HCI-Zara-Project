package com.zaraclone.backend.dtos.request;

import lombok.Data;

@Data
public class ChangePasswordRequest {
    private String email;
    private String password;
    private String verificationCode;

}
