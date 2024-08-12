package com.bluefashion.c2cbluefashionbitirmeprojesi;

import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.ErrorDataResult;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;


@SpringBootApplication
@RestControllerAdvice
public class C2CBlueFashionBitirmeProjesiApplication {

    public static void main(String[] args) {
        SpringApplication.run(C2CBlueFashionBitirmeProjesiApplication.class, args);
    }

    @Bean
    public ModelMapper getModelMapper() {
        return new ModelMapper();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @ExceptionHandler
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ErrorDataResult<Object> handleValidationErrors(MethodArgumentNotValidException argumentNotValidException) {
        Map<String, String> handleValidation = new HashMap<>();

        for (FieldError fieldError : argumentNotValidException.getBindingResult().getFieldErrors()) {
            handleValidation.put(fieldError.getCode(), fieldError.getDefaultMessage());
        }
        return new ErrorDataResult<>(handleValidation, "Validation Errors");
    }

    @ExceptionHandler
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ErrorDataResult<Object> handleBusinessErrors(BusinessException businessException) {
        return new ErrorDataResult<>(businessException.getMessage(), "Business Error");
    }


}
