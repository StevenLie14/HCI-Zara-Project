package com.zaraclone.backend.mappers;

import com.zaraclone.backend.dtos.request.CreateOrUpdateShippingAddressRequest;
import com.zaraclone.backend.dtos.response.ShippingAddressDto;
import com.zaraclone.backend.entities.ShippingAddress;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ShippingAddressMapper {
    ShippingAddressDto toDto(ShippingAddress user);

    ShippingAddress toEntity(CreateOrUpdateShippingAddressRequest request);

    void update(CreateOrUpdateShippingAddressRequest request, @MappingTarget ShippingAddress user);
}
