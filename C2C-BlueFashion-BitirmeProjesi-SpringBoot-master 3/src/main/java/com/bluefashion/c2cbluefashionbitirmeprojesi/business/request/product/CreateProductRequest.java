package com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateProductRequest {

    private String productTitle;
    private String productDescription;
    private double productPrice;
    private double productDiscountPrice;
    private int brandId;
    private int sizeId;
    private int categoryId;
    private int colorId;
    private int userId;
    private int productImageId;

}
