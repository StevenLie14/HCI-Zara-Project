package com.zaraclone.backend.dtos.request;

import lombok.Data;

@Data
public class CreateCartItemRequest {
    private String variantId;
    private String productId;
    private int quantity;
}
