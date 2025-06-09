package com.zaraclone.backend.dtos.request;

import java.util.List;
import lombok.Data;

@Data
public class CreateProductRequest {
    private String name;
    private String description;
    private String categoryId;
    private String gender;
    private List<CreateProductVariantRequest> variants;
    private List<CreateProductImageRequest> images;
}
