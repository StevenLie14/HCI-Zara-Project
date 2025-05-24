package com.zaraclone.backend.dtos.request;

import lombok.Data;

import java.util.List;

@Data
public class UpdateProductRequest {
    private String id;
    private String name;
    private String description;
    private String categoryId;
    private List<UpdateProductVariantRequest> variants;
    private List<UpdateProductImageRequest> images;
}
