package com.zaraclone.backend.dtos.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.zaraclone.backend.enums.TransactionStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.sql.Timestamp;
import java.util.List;

@AllArgsConstructor
@Getter
public class TransactionDto {
    private String id;
    private TransactionStatus status;
    private ShippingAddressDto address;
    private String paymentMethod;
    private UserDto user;
    private List<TransactionItemDto> items;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp createdAt;
}
