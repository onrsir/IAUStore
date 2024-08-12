package com.bluefashion.c2cbluefashionbitirmeprojesi.core.auth;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.user.UserAuthGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.user.DetailsUserRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.mapping.ModelMapperService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.dataAccess.abstracts.UserDao;
import com.bluefashion.c2cbluefashionbitirmeprojesi.entities.concrates.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/Auth")
public class AuthController {


    private UserDao userDao;
    private ModelMapperService modelMapperService;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(UserDao userDao, ModelMapperService modelMapperService) {
        this.userDao = userDao;
        this.modelMapperService = modelMapperService;
    }

    @PostMapping("/login")
    ResponseEntity<?> handleAuthentication() {
        DetailsUserRequest userDetails = (DetailsUserRequest) SecurityContextHolder.getContext().getAuthentication().getPrincipal();


        String username = userDetails.getUsername();
        User inDB = this.userDao.getByUserName(username);
        UserAuthGetDto response = this.modelMapperService.forDto().map(inDB, UserAuthGetDto.class);
        return ResponseEntity.ok().body(response);
    }

}
