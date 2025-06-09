package com.zaraclone.backend.mappers;

import com.zaraclone.backend.dtos.request.CreateCartItemRequest;
import com.zaraclone.backend.dtos.request.UpdateCartItemRequest;
import com.zaraclone.backend.dtos.response.CartItemDto;
import com.zaraclone.backend.entities.CartItem;
import com.zaraclone.backend.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring", uses = {ProductVariantMapper.class,ProductMapper.class})
public interface CartMapper {
    CartItemDto toDto(CartItem item);
    CartItem toEntity(CreateCartItemRequest createCartItemRequest);

    void update(UpdateCartItemRequest request, @MappingTarget CartItem item);
}
