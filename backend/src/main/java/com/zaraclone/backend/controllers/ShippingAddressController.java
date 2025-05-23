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
    public ResponseEntity<List<ShippingAddressDto>> createOrUpdateCartItem(@RequestBody List<CreateOrUpdateShippingAddressRequest> request) {
        List<ShippingAddressDto> dto = shippingAddressService.createOrUpdateShippingAddress(request);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShippingAddress(@PathVariable String id) {
        shippingAddressService.deleteShippingAddressById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
