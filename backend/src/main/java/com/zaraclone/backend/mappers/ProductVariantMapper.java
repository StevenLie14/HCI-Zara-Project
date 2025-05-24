package com.zaraclone.backend.mappers;

import com.zaraclone.backend.dtos.response.ProductVariantDto;
import com.zaraclone.backend.entities.ProductVariant;
import org.mapstruct.*;


@Mapper(componentModel = "spring")
public interface ProductVariantMapper {
    @Mappings({
            @Mapping(source = "product.id", target = "productId")
    })
    ProductVariantDto toDto(ProductVariant product);
}
