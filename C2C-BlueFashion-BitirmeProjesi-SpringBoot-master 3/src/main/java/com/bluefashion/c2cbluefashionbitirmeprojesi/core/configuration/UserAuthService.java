package com.bluefashion.c2cbluefashionbitirmeprojesi.core.configuration;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.user.DetailsUserRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.mapping.ModelMapperService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.dataAccess.abstracts.UserDao;
import com.bluefashion.c2cbluefashionbitirmeprojesi.entities.concrates.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserAuthService implements UserDetailsService {
    private UserDao userDao;
    private ModelMapperService modelMapperService;

    @Autowired
    public UserAuthService(UserDao userDao, ModelMapperService modelMapperService) {
        this.userDao = userDao;
        this.modelMapperService = modelMapperService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User inDB = this.userDao.getByUserName(username);
        if (inDB == null)
            throw new UsernameNotFoundException("user Not Found");
        return new DetailsUserRequest(inDB);
    }
}
