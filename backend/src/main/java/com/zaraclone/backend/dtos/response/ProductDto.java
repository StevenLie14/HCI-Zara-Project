package com.zaraclone.backend.dtos.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.sql.Timestamp;
import java.util.List;

@AllArgsConstructor
@Getter
public class ProductDto {
    private String id;
    private String name;
    private String description;
    private String gender;
    private CategoryDto category;
    private List<ProductVariantDto> productVariants;
    private List<ProductImageDto> productImages;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp createdAt;
}
