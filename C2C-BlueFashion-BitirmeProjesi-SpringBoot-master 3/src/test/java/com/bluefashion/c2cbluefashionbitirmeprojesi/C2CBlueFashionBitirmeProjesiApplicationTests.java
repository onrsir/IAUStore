package com.bluefashion.c2cbluefashionbitirmeprojesi;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class C2CBlueFashionBitirmeProjesiApplicationTests {

    @Autowired
    private ProductService productService;

    @Test
    void contextLoads() {
        System.out.println(productService.getProductCategoryList().getData());

    }

    @BeforeEach
    void setup() {

    }

    //en son bi cryp encoder implementasyonu yamadık hiçbiyere onu eklicez o yuzden videoları hep izlemen lazım ahmet bey

}
