package com.zaraclone.backend.services;

import com.zaraclone.backend.dtos.request.CreateCartItemRequest;
import com.zaraclone.backend.dtos.request.UpdateCartItemRequest;
import com.zaraclone.backend.dtos.response.CartItemDto;
import com.zaraclone.backend.mappers.CartMapper;
import com.zaraclone.backend.repositories.CartRepository;
import com.zaraclone.backend.repositories.ProductRepository;
import com.zaraclone.backend.repositories.ProductVariantRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final CartMapper cartMapper;
    private final AuthService authService;

    public List<CartItemDto> getMyCartItems() {
        var user = authService.getCurrentUser();
        return cartRepository.findByUserId(user.getId()).stream()
                .map(cartMapper::toDto)
                .toList();
    }

    public CartItemDto createCartItem(CreateCartItemRequest createCartItemRequest) {
        var user = authService.getCurrentUser();
        var cartItem = cartMapper.toEntity(createCartItemRequest);
        cartItem.setUser(user);
        var product = productRepository.findById(createCartItemRequest.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + createCartItemRequest.getProductId()));
        var productVariant = productVariantRepository.findById(createCartItemRequest.getVariantId())
                .orElseThrow(() -> new EntityNotFoundException("Product Variant not found with ID: " + createCartItemRequest.getVariantId()));
        cartItem.setProduct(product);
        cartItem.setVariant(productVariant);
        return cartMapper.toDto(cartRepository.save(cartItem));
    }

    public CartItemDto updateCartItem(String id, UpdateCartItemRequest updateCartItemRequest) {
        var cartItem = cartRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Cart Item not found with ID: " + id));
        var user = authService.getCurrentUser();
        if (!cartItem.getUser().getId().equals(user.getId())) {
            throw new EntityNotFoundException("Cart Item does not belong to the current user");
        }
        cartMapper.update(updateCartItemRequest, cartItem);
        return cartMapper.toDto(cartRepository.save(cartItem));
    }


    public void deleteCartItemById(String id) {
        var cartItem = cartRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Cart Item not found with ID: " + id));
        cartRepository.delete(cartItem);
    }

    public void deleteAllCartItems() {
        var user = authService.getCurrentUser();
        cartRepository.deleteCartItemByUser(user);
    }
}
