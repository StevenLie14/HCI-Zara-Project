package com.zaraclone.backend.dtos.request;

import lombok.Data;

@Data
public class UpdateProductVariantRequest {
    private String id;
    private String size;
    private String color;
    private String variantImage;
    private int price;
    private int stock;
}
