package com.zaraclone.backend.repositories;

import com.zaraclone.backend.entities.CartItem;
import com.zaraclone.backend.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<CartItem, String> {
    List<CartItem> findByUserId(String userId);
    @Transactional
    void deleteCartItemByUser(User user);

}
