package com.zaraclone.backend.controllers;


import com.zaraclone.backend.dtos.request.CreateProductRequest;
import com.zaraclone.backend.dtos.request.UpdateProductRequest;
import com.zaraclone.backend.dtos.response.ProductDto;
import com.zaraclone.backend.services.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
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

    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateProduct(

            @RequestPart("product") UpdateProductRequest productRequest,
            @RequestPart(name = "variantImages",required = false) List<MultipartFile> variantImages,
            @RequestPart(name = "productImages",required = false) List<MultipartFile> productImages
    ) {
        if (variantImages == null) {
            variantImages = new ArrayList<>();
        }
        if (productImages == null) {
            productImages = new ArrayList<>();
        }
        var product = productService.updateProduct(productRequest, variantImages, productImages);
        return ResponseEntity.status(HttpStatus.CREATED).body(product.getId());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProductById(@PathVariable String id) {
        productService.deleteProductById(id);
        return ResponseEntity.noContent().build();
    }



}
