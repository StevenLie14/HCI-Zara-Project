package com.zaraclone.backend.controllers;


import com.zaraclone.backend.dtos.response.ProductDto;
import com.zaraclone.backend.entities.Product;
import com.zaraclone.backend.mappers.ProductMapper;
import com.zaraclone.backend.repositories.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/products")
public class ProductController {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @GetMapping
    public ResponseEntity<Iterable<ProductDto>> getAllProducts(
            @RequestHeader(name = "x-auth-token", required = false) String token,
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
