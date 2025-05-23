package com.zaraclone.backend.dtos.request;

import lombok.Data;

@Data
public class CreateOrUpdateShippingAddressRequest {
    private String id;
    private String address;
    private String city;
    private String state;
    private String country;
    private String postalCode;
}
