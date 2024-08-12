package com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateSizeRequest {
    @NotNull
    private String sizeName;
    @NotNull
    private int categoryId;
}
