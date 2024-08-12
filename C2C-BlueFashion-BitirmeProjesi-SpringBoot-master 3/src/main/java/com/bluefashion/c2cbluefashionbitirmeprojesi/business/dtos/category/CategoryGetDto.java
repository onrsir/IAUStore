package com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryGetDto {
    private int categoryId;
    private String categoryName;
    private int parent_categoryId;
    private String parent_categoryName;
}
