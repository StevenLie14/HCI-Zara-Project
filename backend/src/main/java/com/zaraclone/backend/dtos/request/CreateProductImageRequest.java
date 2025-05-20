package com.zaraclone.backend.dtos.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CreateProductImageRequest {
    private String productImage;

}
