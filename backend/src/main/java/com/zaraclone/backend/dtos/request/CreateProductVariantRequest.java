package com.zaraclone.backend.dtos.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CreateProductVariantRequest {
    private String size;
    private String color;
    private String variantImage;
    private int price;
    private int stock;
}
