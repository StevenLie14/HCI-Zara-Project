package com.zaraclone.backend.mappers;

import com.zaraclone.backend.dtos.response.ProductImageDto;
import com.zaraclone.backend.entities.ProductImage;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface ProductImageMapper {
    ProductImageDto toDto(ProductImage product);
}
