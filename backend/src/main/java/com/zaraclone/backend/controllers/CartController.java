package com.zaraclone.backend.controllers;


import com.zaraclone.backend.dtos.request.*;
import com.zaraclone.backend.dtos.response.CartItemDto;
import com.zaraclone.backend.services.CartService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/carts")
public class CartController {
    private final CartService cartService;

    @GetMapping
    public ResponseEntity<Iterable<CartItemDto>> getAllCartItemsByUserId() {
        return ResponseEntity.ok(cartService.getMyCartItems());
    }

    @PostMapping
    public ResponseEntity<CartItemDto> createCartItem(@RequestBody CreateCartItemRequest request) {
        CartItemDto dto = cartService.createCartItem(request);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CartItemDto> updateCartItem(@PathVariable String id, @RequestBody UpdateCartItemRequest request) {
        return ResponseEntity.ok(cartService.updateCartItem(id,request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable String id) {
        cartService.deleteCartItemById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
