package com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.shipping;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShippingGetDto {

    private int shippingId;
    private String shippingCompany;
    private String shippingPaymentMethod;
    private String shippingPrice;
    private String shippingDate;
    private String shippingTrackingNumber;

    private int addressId;
}
