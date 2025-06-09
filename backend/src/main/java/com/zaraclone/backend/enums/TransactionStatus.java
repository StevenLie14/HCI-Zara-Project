package com.zaraclone.backend.enums;


import lombok.Getter;

@Getter
public enum TransactionStatus {
    PENDING("pending"),
    PAID("paid"),
    SHIPPED("shipped"),
    DELIVERED("delivered"),
    CANCELLED("cancelled");

    private final String label;

    TransactionStatus(String label) {
        this.label = label;
    }

}
