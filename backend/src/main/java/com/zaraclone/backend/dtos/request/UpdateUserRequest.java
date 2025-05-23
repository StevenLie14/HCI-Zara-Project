package com.zaraclone.backend.dtos.request;

import lombok.Data;

import java.sql.Date;
import java.sql.Timestamp;

@Data
public class UpdateUserRequest {
    private String name;
    private String phone;
    private String gender;
    private Date birthDate;
}
