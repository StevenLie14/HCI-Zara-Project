package com.zaraclone.backend.dtos.request;

import lombok.Data;

@Data
public class UpdateUserRequest {
    private String username;
    private String email;
}
