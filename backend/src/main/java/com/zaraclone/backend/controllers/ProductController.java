package com.zaraclone.backend.controllers;


import com.zaraclone.backend.dtos.request.CreateProductRequest;
import com.zaraclone.backend.dtos.response.ProductDto;
import com.zaraclone.backend.mappers.ProductMapper;
import com.zaraclone.backend.repositories.ProductRepository;
import com.zaraclone.backend.services.ProductService;
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
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<Iterable<ProductDto>> getAllProducts(
            @RequestParam(name = "categoryId",required = false) String categoryId
    ) {
        var prods = productService.getAllProducts(categoryId);
        return ResponseEntity.ok(prods);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable String id) {
        var product = productService.getProductById(id);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(product);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createProduct(

            @RequestPart("product") CreateProductRequest productRequest,
            @RequestPart("variantImages") List<MultipartFile> variantImages,
            @RequestPart("productImages") List<MultipartFile> productImages
    ) {
        var product = productService.createProduct(productRequest, variantImages, productImages);
        return ResponseEntity.status(HttpStatus.CREATED).body(product.getId());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductById(@PathVariable String id) {
        var isDeleted = productService.deleteProductById(id);
        if (!isDeleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }



}
