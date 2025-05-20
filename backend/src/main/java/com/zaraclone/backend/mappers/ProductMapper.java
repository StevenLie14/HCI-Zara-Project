package com.zaraclone.backend.mappers;

import com.zaraclone.backend.dtos.request.CreateProductRequest;
import com.zaraclone.backend.dtos.response.ProductDto;
import com.zaraclone.backend.entities.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;


@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mappings({
            @Mapping(target = "categoryId", source = "category.id"),
            @Mapping(target = "categoryName", source = "category.name"),
    })
    ProductDto toDto(Product product);

    @Mappings({
            @Mapping(target = "productImages", source = "images"),
            @Mapping(target = "productVariants", source = "variants")
    })
    Product toEntity(CreateProductRequest productDto);
}
