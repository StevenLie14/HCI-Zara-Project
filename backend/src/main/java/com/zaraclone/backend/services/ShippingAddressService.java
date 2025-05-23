package com.zaraclone.backend.services;

import com.zaraclone.backend.dtos.request.CreateOrUpdateShippingAddressRequest;
import com.zaraclone.backend.dtos.response.ShippingAddressDto;
import com.zaraclone.backend.entities.ShippingAddress;
import com.zaraclone.backend.mappers.ShippingAddressMapper;
import com.zaraclone.backend.repositories.ShippingAddressRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ShippingAddressService {

    private final ShippingAddressRepository shippingAddressRepository;
    private final ShippingAddressMapper shippingAddressMapper;
    private final AuthService authService;

    public List<ShippingAddressDto> getMyShippingAddresses() {
        var user = authService.getCurrentUser();
        return shippingAddressRepository.findByUserId(user.getId()).stream()
                .map(shippingAddressMapper::toDto)
                .toList();
    }

    public ShippingAddressDto createShippingAddress(CreateOrUpdateShippingAddressRequest request) {
        var user = authService.getCurrentUser();
        ShippingAddress shippingAddress = shippingAddressMapper.toEntity(request);
        shippingAddress.setUser(user);
        shippingAddressRepository.save(shippingAddress);
        return shippingAddressMapper.toDto(shippingAddress);
    }

    public ShippingAddressDto updateShippingAddress(String id, CreateOrUpdateShippingAddressRequest request) {
        var user = authService.getCurrentUser();
        var shippingAddress = shippingAddressRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Shipping Address not found with ID: " + id));
        if (!shippingAddress.getUser().getId().equals(user.getId())) {
            throw new EntityNotFoundException("Shipping Address does not belong to the current user");
        }
        shippingAddressMapper.update(request, shippingAddress);
        shippingAddressRepository.save(shippingAddress);
        return shippingAddressMapper.toDto(shippingAddress);
    }

    public void deleteShippingAddressById(String id) {
        var user = authService.getCurrentUser();
        var cartItem = shippingAddressRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Shipping Address not found with ID: " + id));
        if (!cartItem.getUser().getId().equals(user.getId())) {
            throw new EntityNotFoundException("Shipping Address does not belong to the current user");
        }
        shippingAddressRepository.delete(cartItem);
    }
}
