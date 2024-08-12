package com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.image;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateImageRequest {


    @NotNull
    private String imageSubInfo;
    @NotNull
    private String imageUrl;
    private MultipartFile file;
}
