package com.zaraclone.backend.dtos.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.sql.Timestamp;

@AllArgsConstructor
@Getter
public class ProductVariantDto {
    private String id;
    private String productId;
    private String size;
    private String color;
    private String variantImage;
    private int price;
    private int stock;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp createdAt;
}
