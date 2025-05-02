package com.zaraclone.backend.repositories;

import com.zaraclone.backend.entities.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, String> {
}
