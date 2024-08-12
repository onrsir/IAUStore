package com.bluefashion.c2cbluefashionbitirmeprojesi.business.concrates;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts.UserService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.user.UserGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.user.UserListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.user.CreateUserRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.user.DeleteUserRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.user.UpdateUserRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.mapping.ModelMapperService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.SuccessDataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.SucessResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.dataAccess.abstracts.UserDao;
import com.bluefashion.c2cbluefashionbitirmeprojesi.entities.concrates.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserManager implements UserService {
    private UserDao userDao;
    private ModelMapperService modelMapperService;
    private PasswordEncoder passwordEncoder;


    @Autowired
    public UserManager(UserDao userDao, ModelMapperService modelMapperService, PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.modelMapperService = modelMapperService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public DataResult<List<UserListDto>> getAll() {
        List<User> response = this.userDao.findAll();
        List<UserListDto> result = response.stream()
                .map(user -> this.modelMapperService.forDto().map(user, UserListDto.class))
                .collect(Collectors.toList());

        return new SuccessDataResult<>(result, "Kullanıcılar Listelendi..");
    }

    @Override
    public DataResult<UserGetDto> getByUserId(int userId) throws BusinessException {
        checkIfUserId(userId);
        User response = this.userDao.getById(userId);
        UserGetDto result = this.modelMapperService.forDto().map(response, UserGetDto.class);
        return new SuccessDataResult<>(result, userId + " No'ya Ait Kullanıcı Getirildi..");
    }

    @Override
    public DataResult<UserGetDto> getByUserName(String userName) throws BusinessException {
        checkIfExistUserName(userName);
        User response = this.userDao.getByUserName(userName);
        UserGetDto result = this.modelMapperService.forDto().map(response, UserGetDto.class);
        return new SuccessDataResult<>(result, userName + " Ait Kullanıcı Getirildi..");

    }

    @Override
    public DataResult<UserGetDto> getByUserMail(String userMail) throws BusinessException {
        checkIfExistUserMail(userMail);
        User response = this.userDao.getByUserMail(userMail);
        UserGetDto result = this.modelMapperService.forDto().map(response, UserGetDto.class);
        return new SuccessDataResult<>(result, userMail + " Ait Kullanıcı Getirildi..");

    }

    @Override
    public Result add(CreateUserRequest createUserRequest) throws BusinessException {

        checkIfUserName(createUserRequest.getUserName());
        checkIfUserMail(createUserRequest.getUserMail());

        User result = this.modelMapperService.forRequest().map(createUserRequest, User.class);
        result.setUserPassword(this.passwordEncoder.encode(result.getUserPassword()));

        result.setUserId(0);
        this.userDao.save(result);
        return new SucessResult(createUserRequest.getUserName() + " Başarıyla Eklendi..");
    }

    @Override
    public Result update(UpdateUserRequest updateUserRequest) throws BusinessException {
        User result = this.modelMapperService.forRequest().map(updateUserRequest, User.class);
        result.setUserPassword(this.passwordEncoder.encode(result.getUserPassword()));
        this.userDao.save(result);
        return new SucessResult(updateUserRequest.getUserName() + " Başarıyla Güncellendi..");

    }

    @Override
    public Result delete(DeleteUserRequest deleteUserRequest) throws BusinessException {
        checkIfUserId(deleteUserRequest.getUserId());
        User result = this.userDao.getById(deleteUserRequest.getUserId());
        this.userDao.delete(result);
        return new SucessResult(" Başarıyla Silindi..");
    }

    @Override
    public DataResult<List<UserListDto>> getAllPaged(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        List<User> response = this.userDao.findAll(pageable).getContent();
        List<UserListDto> result = response.stream()
                .map(user -> this.modelMapperService.forDto().map(user, UserListDto.class))
                .collect(Collectors.toList());
        return new SuccessDataResult<>(result, "Kullanıcılar Listelendi..");
    }

    @Override
    public DataResult<List<UserListDto>> getAllSorted(boolean sort) {
        Sort userSort = Sort.by(ifSortConverter(sort), "UserName");
        List<User> response = this.userDao.findAll(userSort);
        List<UserListDto> result = response.stream()
                .map(user -> this.modelMapperService.forDto().map(user, UserListDto.class))
                .collect(Collectors.toList());
        return new SuccessDataResult<>(result, "Kullanıcılar Listelendi..");
    }


    public void checkIfUserId(int id) throws BusinessException {
        if (!this.userDao.existsById(id)) {
            throw new BusinessException(id + " No'ya Ait Kullanıcı Bulunamadı..");
        }
    }

    private void checkIfUserName(String userName) throws BusinessException {
        if (this.userDao.existsByUserName(userName)) {
            throw new BusinessException("Kullanıcı İsimleri Aynı olamaz.");
        }
    }

    private void checkIfExistUserName(String userName) throws BusinessException {
        if (!this.userDao.existsByUserName(userName)) {
            throw new BusinessException("Kullanıcı Bulunamadı");
        }
    }


    private void checkIfUserMail(String userMail) throws BusinessException {
        if (this.userDao.existsByUserMail(userMail)) {
            throw new BusinessException("Mail Adresleri Aynı olamaz.");
        }
    }

    private void checkIfExistUserMail(String userMail) throws BusinessException {
        if (!this.userDao.existsByUserMail(userMail)) {
            throw new BusinessException("Mail Adresleri Bulunamadı");
        }
    }

    private Sort.Direction ifSortConverter(boolean sort) {
        return sort ? Sort.Direction.ASC : Sort.Direction.DESC;
    }
}
