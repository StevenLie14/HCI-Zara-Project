package com.zaraclone.backend.mappers;

import com.zaraclone.backend.dtos.request.CreateProductRequest;
import com.zaraclone.backend.dtos.response.ProductDto;
import com.zaraclone.backend.entities.Product;
import org.mapstruct.*;


@Mapper(componentModel = "spring", uses = {CategoryMapper.class,ProductImageMapper.class,ProductVariantMapper.class})
public interface ProductMapper {
    ProductDto toDto(Product product);

    @Mappings({
            @Mapping(target = "productImages", source = "images"),
            @Mapping(target = "productVariants", source = "variants")
    })
    Product toEntity(CreateProductRequest productDto);
    @AfterMapping
    default void linkProductImages(@MappingTarget Product product) {
        if (product.getProductImages() != null) {
            product.getProductImages().forEach(image -> image.setProduct(product));
        }

        if (product.getProductVariants() != null) {
            product.getProductVariants().forEach(variant -> variant.setProduct(product));
        }
    }
}
