package com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.user.UserGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.user.UserListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.user.CreateUserRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.user.DeleteUserRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.user.UpdateUserRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;

import java.util.List;

public interface UserService {
    DataResult<List<UserListDto>> getAll();

    DataResult<UserGetDto> getByUserId(int userId) throws BusinessException;

    DataResult<UserGetDto> getByUserName(String userName) throws BusinessException;

    DataResult<UserGetDto> getByUserMail(String userMail) throws BusinessException;

    Result add(CreateUserRequest createUserRequest) throws BusinessException;

    Result update(UpdateUserRequest updateUserRequest) throws BusinessException;

    Result delete(DeleteUserRequest deleteUserRequest) throws BusinessException;

    DataResult<List<UserListDto>> getAllPaged(int pageNo, int pageSize);

    DataResult<List<UserListDto>> getAllSorted(boolean sort);

    void checkIfUserId(int id) throws BusinessException;

}
