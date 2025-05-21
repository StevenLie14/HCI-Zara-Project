package com.zaraclone.backend.dtos.request;

import com.zaraclone.backend.enums.TransactionStatus;
import lombok.Data;

@Data
public class UpdateTransactionRequest {
    private TransactionStatus status;

}
