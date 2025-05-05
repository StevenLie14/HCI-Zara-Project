package com.zaraclone.backend.mappers;

import com.zaraclone.backend.dtos.UserDto;
import com.zaraclone.backend.entities.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDto(User user);
}
