package com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.shipping;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateShippingRequest {

    @NotNull
    private String shippingCompany;
    @NotNull
    private String shippingPaymentMethod;
    @NotNull
    private String shippingPrice;
    @NotNull
    private String shippingDate;
    private String shippingTrackingNumber;

    private int addressId;
}
