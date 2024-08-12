package com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.address;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressGetDto {

    private int addressId;
    private String addressTitle;
    private String addressFirstName;
    private String addressLastName;
    private String addressMail;
    private String addressPhoneNumber;
    private String addressProvince;
    private String addressCounty;
    private String addressDistrict;
    private String addressPostCode;
    private String addressFullAdress;
    private int userId;


}
