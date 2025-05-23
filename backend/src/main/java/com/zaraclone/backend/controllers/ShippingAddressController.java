package com.zaraclone.backend.controllers;

import com.zaraclone.backend.dtos.request.CreateOrUpdateShippingAddressRequest;
import com.zaraclone.backend.dtos.response.ShippingAddressDto;
import com.zaraclone.backend.services.ShippingAddressService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/address")
public class ShippingAddressController {
    private final ShippingAddressService shippingAddressService;

    @GetMapping
    public ResponseEntity<Iterable<ShippingAddressDto>> getAllShippingAddresses() {
        return ResponseEntity.ok(shippingAddressService.getMyShippingAddresses());
    }

    @PostMapping
    public ResponseEntity<ShippingAddressDto> createShippingAddress(
            @RequestBody CreateOrUpdateShippingAddressRequest request) {
        var shippingAddress = shippingAddressService.createShippingAddress(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(shippingAddress);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShippingAddressDto> updateShippingAddress(
            @PathVariable String id,
            @RequestBody CreateOrUpdateShippingAddressRequest request) {
        var shippingAddress = shippingAddressService.updateShippingAddress(id, request);
        return ResponseEntity.ok(shippingAddress);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShippingAddress(@PathVariable String id) {
        shippingAddressService.deleteShippingAddressById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
