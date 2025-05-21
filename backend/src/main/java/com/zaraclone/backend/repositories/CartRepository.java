package com.zaraclone.backend.repositories;

import com.zaraclone.backend.entities.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<CartItem, String> {
    List<CartItem> findByUserId(String userId);
//
//    @EntityGraph(attributePaths = "category")
//    @Query("SELECT p FROM Product p")
//    List<Product> findAllWithCategory();
}
