package com.zaraclone.backend.repositories;

import com.zaraclone.backend.entities.ShippingAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShippingAddressRepository extends JpaRepository<ShippingAddress, String> {
    List<ShippingAddress> findByUserId(String userId);
}
