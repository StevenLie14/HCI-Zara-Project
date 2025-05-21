package com.zaraclone.backend.dtos.request;

import lombok.Data;

import java.util.List;

@Data
public class CreateTransactionRequest {
    private List<CreateTransactionItemRequest> items;
}
