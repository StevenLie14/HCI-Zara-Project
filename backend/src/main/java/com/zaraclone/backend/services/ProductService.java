package com.zaraclone.backend.services;

import com.zaraclone.backend.dtos.request.CreateProductRequest;
import com.zaraclone.backend.dtos.request.UpdateProductRequest;
import com.zaraclone.backend.dtos.response.ProductDto;
import com.zaraclone.backend.entities.ProductImage;
import com.zaraclone.backend.entities.ProductVariant;
import com.zaraclone.backend.exceptions.FileUploadException;
import com.zaraclone.backend.mappers.ProductMapper;
import com.zaraclone.backend.repositories.CategoryRepository;
import com.zaraclone.backend.repositories.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProductService {

    private final MinioService minioService;
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final CategoryRepository categoryRepository;

    public List<ProductDto> getAllProducts(String categoryId) {
        if (categoryId != null) {
            return productRepository.findByCategoryId(categoryId).stream()
                    .map(productMapper::toDto)
                    .toList();
        } else {
            var products = productRepository.findAll();
            System.out.println("Products: " + products);
            return productRepository.findAll().stream()
                    .map(productMapper::toDto)
                    .toList();
        }
    }

    public ProductDto createProduct(CreateProductRequest productRequest, List<MultipartFile> variantImages, List<MultipartFile> productImages) {
        var category = categoryRepository.findById(productRequest.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found with ID: " + productRequest.getCategoryId()));
        var product = productMapper.toEntity(productRequest);


        try {
            for (MultipartFile file : variantImages) {
                minioService.uploadFile(file.getOriginalFilename(), file.getInputStream(), file.getContentType());
            }
            for (MultipartFile file : productImages) {
                minioService.uploadFile(file.getOriginalFilename(), file.getInputStream(), file.getContentType());
            }
        } catch (Exception e) {
            throw new FileUploadException("Failed to upload product or variant images", e);
        }

        return productMapper.toDto(productRepository.save(product));
    }

    private void deleteImage (Set<String> existingImageNames) {
        for (String existingImage : existingImageNames) {
            if (!existingImageNames.contains(existingImage)) {
                try {
                    minioService.deleteFile(existingImage);
                } catch (Exception e) {
                    throw new FileUploadException("Failed to delete product image: " + existingImage, e);
                }
            }
        }
    }

    public ProductDto updateProduct(
            UpdateProductRequest productRequest,
            List<MultipartFile> variantImages,
            List<MultipartFile> productImages) {

        var product = productRepository.findById(productRequest.getId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + productRequest.getId()));

        var category = categoryRepository.findById(productRequest.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found with ID: " + productRequest.getCategoryId()));

        product.setCategory(category);

        Set<String> existingVariantImageNames = product.getProductVariants().stream()
                .map(ProductVariant::getVariantImage)
                .collect(Collectors.toSet());

//        Set<String> newVariantImageNames = variantImages.stream()
//                .map(MultipartFile::getOriginalFilename)
//                .filter(Objects::nonNull)
//                .collect(Collectors.toSet());

        deleteImage(existingVariantImageNames);

        for (MultipartFile file : variantImages) {
            if (file.getOriginalFilename() != null && !existingVariantImageNames.contains(file.getOriginalFilename())) {
                try {
                    minioService.uploadFile(file.getOriginalFilename(), file.getInputStream(), file.getContentType());
                } catch (Exception e) {
                    throw new FileUploadException("Failed to upload variant image: " + file.getOriginalFilename(), e);
                }
            }
        }

        Set<String> existingProductImageNames = product.getProductImages().stream()
                .map(ProductImage::getProductImage)
                .collect(Collectors.toSet());

//        Set<String> newProductImageNames = productImages.stream()
//                .map(MultipartFile::getOriginalFilename)
//                .filter(Objects::nonNull)
//                .collect(Collectors.toSet());

        deleteImage(existingProductImageNames);

        for (MultipartFile file : productImages) {
            if (file.getOriginalFilename() != null && !existingProductImageNames.contains(file.getOriginalFilename())) {
                try {
                    minioService.uploadFile(file.getOriginalFilename(), file.getInputStream(), file.getContentType());
                } catch (Exception e) {
                    throw new FileUploadException("Failed to upload product image: " + file.getOriginalFilename(), e);
                }
            }
        }

        System.out.println("Product Request: " + productRequest);

        productMapper.updateEntity(productRequest, product);
        return productMapper.toDto(productRepository.save(product));
    }


    public ProductDto getProductById(String id) {
        return productRepository.findById(id)
                .map(productMapper::toDto)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + id));
    }

    public void deleteProductById(String id) {
        var product = productRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Product not found with ID: " + id));

        try {
            productRepository.delete(product);
            for (var image : product.getProductImages()) {
                minioService.deleteFile(image.getProductImage());
            }
            for (var variant : product.getProductVariants()) {
                minioService.deleteFile(variant.getVariantImage());
            }
        } catch (Exception e) {
            throw new FileUploadException("Failed to delete product files", e);
        }
    }
}
