package com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryListDto {
    private int categoryId;
    private String categoryName;

    private String parent_categoryName;

}
