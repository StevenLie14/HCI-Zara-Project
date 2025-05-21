package com.zaraclone.backend.controllers;


import com.zaraclone.backend.dtos.request.CreateTransactionRequest;
import com.zaraclone.backend.dtos.request.UpdateTransactionRequest;
import com.zaraclone.backend.dtos.response.TransactionDto;
import com.zaraclone.backend.services.TransactionService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/transactions")
public class TransactionController {
    private final TransactionService transactionService;

    @GetMapping
    public ResponseEntity<Iterable<TransactionDto>> getMyTransactions() {
        return ResponseEntity.ok(transactionService.getMyTransactions());
    }

    @PostMapping
    public ResponseEntity<TransactionDto> createCartItem(@RequestBody CreateTransactionRequest request) {
        TransactionDto dto = transactionService.createTransaction(request);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransactionDto> updateCartItem(@PathVariable String id, @RequestBody UpdateTransactionRequest request) {
        return ResponseEntity.ok(transactionService.updateTransaction(id,request));
    }




}
