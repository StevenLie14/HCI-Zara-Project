package com.zaraclone.backend.mappers;

import com.zaraclone.backend.dtos.response.TransactionItemDto;
import com.zaraclone.backend.entities.TransactionItem;
import org.mapstruct.*;


@Mapper(componentModel = "spring", uses = {ProductMapper.class, ProductVariantMapper.class})
public interface TransactionItemMapper {
    TransactionItemDto toDto(TransactionItem item);
}
