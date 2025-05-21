package com.zaraclone.backend.services;

import com.zaraclone.backend.dtos.request.CreateCategoryRequest;
import com.zaraclone.backend.dtos.request.UpdateCategoryRequest;
import com.zaraclone.backend.dtos.response.CategoryDto;
import com.zaraclone.backend.mappers.CategoryMapper;
import com.zaraclone.backend.repositories.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(categoryMapper::toDto)
                .toList();
    }

    public CategoryDto createCategory(CreateCategoryRequest createCategoryRequest) {
        var category = categoryMapper.toEntity(createCategoryRequest);
        return categoryMapper.toDto(categoryRepository.save(category));
    }

    public CategoryDto updateCategory(String id, UpdateCategoryRequest updateCategoryRequest) {
        var category = categoryRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Category not found with ID: " + id));
        categoryMapper.update(updateCategoryRequest, category);
        return categoryMapper.toDto(categoryRepository.save(category));
    }


    public void deleteCategoryById(String id) {
        var category = categoryRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Category not found with ID: " + id));
        categoryRepository.delete(category);
    }
}
