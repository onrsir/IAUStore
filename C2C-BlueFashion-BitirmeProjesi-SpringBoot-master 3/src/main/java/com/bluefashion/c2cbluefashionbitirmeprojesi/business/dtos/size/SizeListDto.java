package com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SizeListDto {
    private int sizeId;
    private String sizeName;
    private String categoryName;
}
