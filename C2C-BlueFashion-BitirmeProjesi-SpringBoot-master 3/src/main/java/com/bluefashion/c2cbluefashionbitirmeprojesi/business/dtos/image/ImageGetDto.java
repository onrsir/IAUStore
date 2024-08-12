package com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.image;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageGetDto {
    private int imageId;
    private String imageSubInfo;
    private String imageUrl;
}
