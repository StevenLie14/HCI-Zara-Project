package com.zaraclone.backend.mappers;

import com.zaraclone.backend.dtos.request.UpdateProductImageRequest;
import com.zaraclone.backend.dtos.response.ProductImageDto;
import com.zaraclone.backend.entities.ProductImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;


@Mapper(componentModel = "spring")
public interface ProductImageMapper {
    @Mappings({
            @Mapping(source = "product.id", target = "productId")
    })
    ProductImageDto toDto(ProductImage product);

//    ProductImage toEntity(UpdateProductImageRequest request);
}
