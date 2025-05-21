package com.zaraclone.backend.services;

import com.zaraclone.backend.dtos.request.CreateTransactionRequest;
import com.zaraclone.backend.dtos.request.UpdateTransactionRequest;
import com.zaraclone.backend.dtos.response.TransactionDto;
import com.zaraclone.backend.mappers.TransactionMapper;
import com.zaraclone.backend.repositories.TransactionRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;
    private final AuthService authService;

    public List<TransactionDto> getMyTransactions() {
        var user = authService.getCurrentUser();
        return transactionRepository.findByUserId(user.getId()).stream()
                .map(transactionMapper::toDto)
                .toList();
    }

    public TransactionDto createTransaction(CreateTransactionRequest createTransactionRequest) {
        var user = authService.getCurrentUser();
        var transaction = transactionMapper.toEntity(createTransactionRequest,user);
        return transactionMapper.toDto(transactionRepository.save(transaction));
    }

    public TransactionDto updateTransaction(String id, UpdateTransactionRequest request) {
        var transaction = transactionRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Transaction not found with ID: " + id));
        var user = authService.getCurrentUser();
        if (!transaction.getUser().getId().equals(user.getId())) {
            throw new EntityNotFoundException("Transaction does not belong to the current user");
        }
        transactionMapper.update(request, transaction);
        return transactionMapper.toDto(transactionRepository.save(transaction));
    }

}
