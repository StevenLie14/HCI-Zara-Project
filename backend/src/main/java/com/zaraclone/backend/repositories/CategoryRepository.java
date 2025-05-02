package com.zaraclone.backend.repositories;

import com.zaraclone.backend.entities.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category, String> {
}
