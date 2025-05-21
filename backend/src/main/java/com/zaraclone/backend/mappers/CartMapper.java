package com.zaraclone.backend.mappers;

import com.zaraclone.backend.dtos.request.CreateCartItemRequest;
import com.zaraclone.backend.dtos.request.UpdateCartItemRequest;
import com.zaraclone.backend.dtos.response.CartItemDto;
import com.zaraclone.backend.entities.CartItem;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CartMapper {
    CartItemDto toDto(CartItem item);
    CartItem toEntity(CreateCartItemRequest createCartItemRequest, String userId);
        void update(UpdateCartItemRequest request, @MappingTarget CartItem item);
}
