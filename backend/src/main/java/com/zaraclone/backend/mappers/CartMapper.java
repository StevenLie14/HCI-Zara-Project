package com.zaraclone.backend.mappers;

import com.zaraclone.backend.dtos.request.CreateCartItemRequest;
import com.zaraclone.backend.dtos.request.UpdateCartItemRequest;
import com.zaraclone.backend.dtos.response.CartItemDto;
import com.zaraclone.backend.entities.CartItem;
import com.zaraclone.backend.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CartMapper {
    CartItemDto toDto(CartItem item);
    @Mapping(target = "user", source = "user")
    CartItem toEntity(CreateCartItemRequest createCartItemRequest, User user);
        void update(UpdateCartItemRequest request, @MappingTarget CartItem item);
}
