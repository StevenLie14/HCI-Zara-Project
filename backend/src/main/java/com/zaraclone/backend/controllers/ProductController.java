package com.zaraclone.backend.controllers;


import com.zaraclone.backend.dtos.request.CreateProductRequest;
import com.zaraclone.backend.dtos.response.ProductDto;
import com.zaraclone.backend.entities.Product;
import com.zaraclone.backend.mappers.ProductMapper;
import com.zaraclone.backend.repositories.ProductRepository;
import com.zaraclone.backend.services.MinioService;
import com.zaraclone.backend.services.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
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
    private final ProductService productService;
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
    public ResponseEntity<String> createProduct(
            @Parameter(
                    description = "Product JSON",
                    required = true,
                    content = @io.swagger.v3.oas.annotations.media.Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CreateProductRequest.class)
                    )
            )
            @RequestPart("product") CreateProductRequest productRequest,
            @RequestPart("variantImages") List<MultipartFile> variantImages,
            @RequestPart("productImages") List<MultipartFile> productImages
    ) {
        var product = productService.createProduct(productRequest, variantImages, productImages);
        return ResponseEntity.status(HttpStatus.CREATED).body(product.getId());
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
