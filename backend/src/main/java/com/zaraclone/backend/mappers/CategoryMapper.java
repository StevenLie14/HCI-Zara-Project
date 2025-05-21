package com.zaraclone.backend.mappers;

import com.zaraclone.backend.dtos.request.CreateCategoryRequest;
import com.zaraclone.backend.dtos.request.UpdateCategoryRequest;
import com.zaraclone.backend.dtos.response.CategoryDto;
import com.zaraclone.backend.entities.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryDto toDto(Category category);
    Category toEntity(CreateCategoryRequest categoryDto);
    void update(UpdateCategoryRequest request, @MappingTarget Category category);
}
