package com.zaraclone.backend.dtos.request;

import lombok.Data;

import java.util.List;

@Data
public class CreateTransactionRequest {
    private String shippingAddressId;
    private String paymentMethod;
}
