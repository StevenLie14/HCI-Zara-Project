package com.zaraclone.backend.dtos.request;

import lombok.Data;

@Data
public class CreateTransactionItemRequest {
    private int quantity;
    private int price;
    private String variantId;
    private String productId;
}
