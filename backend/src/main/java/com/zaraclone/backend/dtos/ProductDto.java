package com.zaraclone.backend.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.zaraclone.backend.entities.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@AllArgsConstructor
@Getter
public class ProductDto {
    private String id;
    private String name;
    private String description;
    private BigDecimal price;
    private String categoryId;
    private String categoryName;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp createdAt;
}
