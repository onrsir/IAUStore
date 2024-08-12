package com.bluefashion.c2cbluefashionbitirmeprojesi.api.controllers;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts.UserService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.user.UserGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.user.UserListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.user.CreateUserRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.user.DeleteUserRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.user.UpdateUserRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/Users")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/getAll")
    DataResult<List<UserListDto>> getAll() {
        return this.userService.getAll();
    }

    @GetMapping("getByUserId")
    DataResult<UserGetDto> getByUserId(@RequestParam int userId) throws BusinessException {
        return this.userService.getByUserId(userId);
    }

    @GetMapping("getByUserName")
    DataResult<UserGetDto> getByUserName(String userName) throws BusinessException {
        return this.userService.getByUserName(userName);

    }

    @GetMapping("getByUserMail")
    DataResult<UserGetDto> getByUserMail(String userMail) throws BusinessException {
        return this.userService.getByUserMail(userMail);
    }

    @PostMapping("/add")
    Result add(@RequestBody @Valid CreateUserRequest createUserRequest) throws BusinessException {
        return this.userService.add(createUserRequest);
    }

    @PutMapping("/update")
    Result update(@RequestBody @Valid UpdateUserRequest updateUserRequest) throws BusinessException {
        return this.userService.update(updateUserRequest);
    }

    @DeleteMapping("/delete")
    Result delete(@RequestBody DeleteUserRequest deleteUserRequest) throws BusinessException {
        return this.userService.delete(deleteUserRequest);
    }

    @GetMapping("/getAllPaged")
    DataResult<List<UserListDto>> getAllPaged(@RequestParam int pageNo, @RequestParam int pageSize) {
        return this.userService.getAllPaged(pageNo, pageSize);
    }

    @GetMapping("/getAllSorted")
    DataResult<List<UserListDto>> getAllSorted(@RequestParam boolean sort) {
        return this.userService.getAllSorted(sort);
    }
}
