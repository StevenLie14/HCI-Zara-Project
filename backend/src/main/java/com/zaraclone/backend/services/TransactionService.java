package com.zaraclone.backend.services;

import com.zaraclone.backend.dtos.request.CreateTransactionRequest;
import com.zaraclone.backend.dtos.request.UpdateTransactionRequest;
import com.zaraclone.backend.dtos.response.TransactionDto;
import com.zaraclone.backend.entities.Transaction;
import com.zaraclone.backend.entities.TransactionItem;
import com.zaraclone.backend.enums.TransactionStatus;
import com.zaraclone.backend.mappers.TransactionMapper;
import com.zaraclone.backend.repositories.CartRepository;
import com.zaraclone.backend.repositories.ProductVariantRepository;
import com.zaraclone.backend.repositories.ShippingAddressRepository;
import com.zaraclone.backend.repositories.TransactionRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@RequiredArgsConstructor
@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;
    private final CartRepository cartRepository;
    private final ShippingAddressRepository shippingAddressRepository;
    private final ProductVariantRepository productVariantRepository;
    private final AuthService authService;

    public List<TransactionDto> getMyTransactions() {
        var user = authService.getCurrentUser();
        return transactionRepository.findByUserId(user.getId()).stream()
                .map(transactionMapper::toDto)
                .toList();
    }


    @Transactional
    public TransactionDto createTransaction(CreateTransactionRequest createTransactionRequest) {
        var user = authService.getCurrentUser();
        var cartItems = cartRepository.findByUserId(user.getId());

        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setPaymentMethod(createTransactionRequest.getPaymentMethod());
        transaction.setAddress(
                shippingAddressRepository.findById(createTransactionRequest.getShippingAddressId())
                        .orElseThrow(() -> new RuntimeException("Shipping address not found"))
        );
        transaction.setStatus(TransactionStatus.PAID);
        transaction.setCreatedAt(Timestamp.from(Instant.now()));
        transaction.setUpdatedAt(Timestamp.from(Instant.now()));

        List<TransactionItem> transactionItems = cartItems.stream().map(cartItem -> {
            var variant = cartItem.getVariant();
            int newStock = variant.getStock() - cartItem.getQuantity();
            if (newStock < 0) {
                throw new RuntimeException("Insufficient stock for variant: " + variant.getId());
            }
            variant.setStock(newStock);
            productVariantRepository.save(variant);

            TransactionItem item = new TransactionItem();
            item.setProduct(cartItem.getProduct());
            item.setVariant(cartItem.getVariant());
            item.setQuantity(cartItem.getQuantity());
            item.setPrice(cartItem.getVariant().getPrice());
            item.setCreatedAt(Timestamp.from(Instant.now()));
            item.setUpdatedAt(Timestamp.from(Instant.now()));
            item.setTransaction(transaction);
            return item;
        }).toList();

        transaction.setItems(transactionItems);
        var saved = transactionRepository.save(transaction);
        cartRepository.deleteCartItemByUser(user);


        return transactionMapper.toDto(saved);
    }
    public TransactionDto updateTransaction(String id, UpdateTransactionRequest request) {
        var transaction = transactionRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Transaction not found with ID: " + id));
        var user = authService.getCurrentUser();
        if (!transaction.getUser().getId().equals(user.getId())) {
            throw new EntityNotFoundException("Transaction does not belong to the current user");
        }
        transaction.setStatus(request.getStatus());
        transaction.setUpdatedAt(Timestamp.from(Instant.now()));
        return transactionMapper.toDto(transactionRepository.save(transaction));
    }

}
