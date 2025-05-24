package com.zaraclone.backend.mappers;

import com.zaraclone.backend.dtos.request.CreateProductRequest;
import com.zaraclone.backend.dtos.request.UpdateProductRequest;
import com.zaraclone.backend.dtos.response.ProductDto;
import com.zaraclone.backend.entities.Category;
import com.zaraclone.backend.entities.Product;
import org.mapstruct.*;


@Mapper(componentModel = "spring", uses = {CategoryMapper.class,ProductImageMapper.class,ProductVariantMapper.class})
public interface ProductMapper {
    ProductDto toDto(Product product);

    @Mappings({
            @Mapping(target = "productImages", source = "productDto.images"),
            @Mapping(target = "productVariants", source = "productDto.variants"),
            @Mapping(target = "name", source = "productDto.name"),
            @Mapping(target = "category", source = "productDto.categoryId")
    })
    Product toEntity(CreateProductRequest productDto);

    @Mappings({
            @Mapping(target = "productImages", source = "request.images"),
            @Mapping(target = "productVariants", source = "request.variants"),
            @Mapping(target = "category", source = "request.categoryId")
    })
    void updateEntity(UpdateProductRequest request, @MappingTarget Product product);

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
