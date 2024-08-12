package com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.color;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateColorRequest {
    private int colorId;
    @NotNull
    private String colorName;
}
