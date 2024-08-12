package com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequest {

    private int userId;
    @NotNull
    private String userFirstName;
    private String userLastName;
    @NotNull
    private String userName;
    @NotNull
    private String userPassword;
    @NotNull
    @Email
    private String userMail;
    @NotNull
    private String userCountry;
    @NotNull
    private Date userRegisterDate;
    private String userAbout;
    @NotNull
    private String userSeller;

    private int coverImageId;

    private int profileImageId;


}
