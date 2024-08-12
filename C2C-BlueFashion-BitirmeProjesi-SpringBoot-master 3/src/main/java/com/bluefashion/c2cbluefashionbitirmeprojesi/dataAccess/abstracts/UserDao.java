package com.bluefashion.c2cbluefashionbitirmeprojesi.dataAccess.abstracts;

import com.bluefashion.c2cbluefashionbitirmeprojesi.entities.concrates.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User, Integer> {

    boolean existsByUserName(String userName);

    boolean existsByUserMail(String userMail);

    User getByUserName(String userName);

    User getByUserMail(String userMail);
}
