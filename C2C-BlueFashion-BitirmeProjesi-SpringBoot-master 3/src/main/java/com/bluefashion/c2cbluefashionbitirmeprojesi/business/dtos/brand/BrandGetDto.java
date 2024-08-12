package com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.brand;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BrandGetDto {
    private int brandId;
    private String brandName;
}
