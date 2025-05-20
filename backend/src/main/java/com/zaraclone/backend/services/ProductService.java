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

    public List<ProductDto> getAllProducts(String categoryId) {
        if (categoryId != null) {
            return productRepository.findByCategoryId(categoryId).stream()
                    .map(productMapper::toDto)
                    .toList();
        } else {
            return productRepository.findAllWithCategory().stream()
                    .map(productMapper::toDto)
                    .toList();
        }
    }

    public ProductDto getProductById(String id) {
        return productRepository.findById(id)
                .map(productMapper::toDto)
                .orElse(null);
    }

    public boolean deleteProductById(String id) {
        var product = productRepository.findById(id).orElse(null);
        if (product == null) {
            return false;
        }

        try {
            productRepository.delete(product);
            for (var image : product.getProductImages()) {
                minioService.deleteFile(image.getProductImage());
            }
            for (var variant : product.getProductVariants()) {
                minioService.deleteFile(variant.getVariantImage());
            }
        } catch (Exception e) {
            System.err.println("Error deleting files: " + e.getMessage());
//            throw new RuntimeException("Error deleting files", e);
            return false;
        }

        return true;
    }
}
