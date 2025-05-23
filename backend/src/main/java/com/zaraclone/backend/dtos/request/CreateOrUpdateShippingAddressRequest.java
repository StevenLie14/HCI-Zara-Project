package com.zaraclone.backend.dtos.request;

import lombok.Data;

@Data
public class CreateOrUpdateShippingAddressRequest {
    private String name;
    private String address;
    private String city;
    private String province;
    private String country;
    private String postalCode;
}
