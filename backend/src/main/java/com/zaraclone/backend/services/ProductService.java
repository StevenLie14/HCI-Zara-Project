package com.zaraclone.backend.services;

import com.zaraclone.backend.dtos.request.CreateProductRequest;
import com.zaraclone.backend.dtos.response.ProductDto;
import com.zaraclone.backend.entities.Category;
import com.zaraclone.backend.mappers.ProductMapper;
import com.zaraclone.backend.repositories.CategoryRepository;
import com.zaraclone.backend.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProductService {

    private final MinioService minioService;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    public ProductDto createProduct(CreateProductRequest productRequest, List<MultipartFile> variantImages, List<MultipartFile> productImages) {
        System.out.println("Creating product: " + productRequest);
        var product = productMapper.toEntity(productRequest);
        System.out.println("Product entity: " + product);
        Category category = categoryRepository.findById(productRequest.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        System.out.println("Category found: " + category);
        product.setCategory(category);

        try {
            for (MultipartFile file : variantImages) {
                minioService.uploadFile(file.getOriginalFilename(), file.getInputStream(), file.getContentType());
            }
            for (MultipartFile file : productImages) {
                minioService.uploadFile(file.getOriginalFilename(), file.getInputStream(), file.getContentType());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error uploading files", e);
        }
        return productMapper.toDto(productRepository.save(product));

    }
}
