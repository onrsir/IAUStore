package com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.address;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateAddressRequest {

    private int addressId;
    @NotNull
    private String addressTitle;
    @NotNull
    private String addressFirstName;
    @NotNull
    private String addressLastName;
    private String addressMail;
    @NotNull
    private String addressPhoneNumber;
    @NotNull
    private String addressProvince;
    @NotNull
    private String addressCounty;
    @NotNull
    private String addressDistrict;
    private String addressPostCode;
    @NotNull
    private String addressFullAdress;
    @NotNull
    private int userId;

}
