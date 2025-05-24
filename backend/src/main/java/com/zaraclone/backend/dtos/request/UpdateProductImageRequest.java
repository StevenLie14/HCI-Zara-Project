package com.zaraclone.backend.dtos.request;

import lombok.Data;

@Data
public class UpdateProductImageRequest {
    private String id;
    private String productImage;

}
