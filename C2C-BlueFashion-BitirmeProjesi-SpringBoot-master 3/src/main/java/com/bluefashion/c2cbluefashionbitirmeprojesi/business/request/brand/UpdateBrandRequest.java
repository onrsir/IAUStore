package com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.brand;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateBrandRequest {
    private int brandId;
    @NotNull
    private String brandName;
}
