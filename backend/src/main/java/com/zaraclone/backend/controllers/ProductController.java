package com.zaraclone.backend.controllers;


import com.zaraclone.backend.dtos.response.ProductDto;
import com.zaraclone.backend.entities.Product;
import com.zaraclone.backend.mappers.ProductMapper;
import com.zaraclone.backend.repositories.ProductRepository;
import com.zaraclone.backend.services.MinioService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/products")
public class ProductController {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final MinioService minioService;

    @GetMapping
    public ResponseEntity<Iterable<ProductDto>> getAllProducts(
            @RequestParam(name = "categoryId",required = false) String categoryId
    ) {
        List<Product> prods;
        if (categoryId != null) {
            prods = productRepository.findByCategoryId(categoryId);
        } else {
            prods = productRepository.findAllWithCategory();
        }
        return ResponseEntity.ok(
                prods.stream()
                    .map(productMapper::toDto).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable String id) {
       var product = productRepository.findById(id).orElse(null);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(productMapper.toDto(product));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createUser(@RequestParam("file") MultipartFile file) {
        try {
            minioService.uploadFile(file.getOriginalFilename(), file.getInputStream(), file.getContentType());
            return ResponseEntity.ok("File uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Upload failed: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductById(@PathVariable String id) {
        var product = productRepository.findById(id).orElse(null);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        productRepository.delete(product);
        return ResponseEntity.noContent().build();
    }



}
