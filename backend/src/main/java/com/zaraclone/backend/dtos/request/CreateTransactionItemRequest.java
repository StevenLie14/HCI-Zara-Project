package com.zaraclone.backend.dtos.request;

import lombok.Data;

@Data
public class CreateTransactionItemRequest {
    private String shippingAddressId;
    private String paymentMethod;
}
