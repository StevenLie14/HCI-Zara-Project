package com.zaraclone.backend.mappers;

import com.zaraclone.backend.dtos.request.CreateTransactionRequest;
import com.zaraclone.backend.dtos.request.UpdateTransactionRequest;
import com.zaraclone.backend.dtos.response.TransactionDto;
import com.zaraclone.backend.entities.Transaction;
import com.zaraclone.backend.entities.User;
import com.zaraclone.backend.enums.TransactionStatus;
import org.mapstruct.*;


@Mapper(componentModel = "spring", uses = {TransactionItemMapper.class, UserMapper.class})
public interface TransactionMapper {
    TransactionDto toDto(Transaction transaction);

    @Mappings({
            @Mapping(target = "user", source = "user"),
    })
    Transaction toEntity(CreateTransactionRequest request, User user);
    @AfterMapping
    default void setDefaultState(@MappingTarget Transaction transaction) {
        transaction.setStatus(TransactionStatus.PENDING);
    }

    void update(UpdateTransactionRequest request, @MappingTarget Transaction transaction);
}
