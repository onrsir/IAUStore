package com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAuthGetDto {

    private int userId;
    private String userFirstName;
    private String userLastName;
    private String userName;
    private String userMail;
    private String userCountry;
    private Date userRegisterDate;
    private String userAbout;
    private String userSeller;
    private int coverImageId;
    private int profileImageId;
    private String coverImage_imageUrl;

    private String profileImage_imageUrl;


}
