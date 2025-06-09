package com.zaraclone.backend.repositories;

import com.zaraclone.backend.entities.Product;
import com.zaraclone.backend.entities.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductVariantRepository extends JpaRepository<ProductVariant, String> {
}
