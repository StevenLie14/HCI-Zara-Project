package com.zaraclone.backend.mappers;

import com.zaraclone.backend.dtos.response.CategoryDto;
import com.zaraclone.backend.entities.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
     CategoryDto toDto(Category category);
}
