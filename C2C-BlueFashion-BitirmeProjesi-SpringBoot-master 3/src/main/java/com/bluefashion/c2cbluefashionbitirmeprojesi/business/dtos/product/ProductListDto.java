package com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductListDto {

    private int productId;
    private String productTitle;
    private String productDescription;
    private double productPrice;
    private double productDiscountPrice;

    private String brandName;
    private String sizeName;
    private String categoryName;
    private String colorName;
    private String userName;
    private String profileImageImageUrl;
    private String imageUrl;

}
