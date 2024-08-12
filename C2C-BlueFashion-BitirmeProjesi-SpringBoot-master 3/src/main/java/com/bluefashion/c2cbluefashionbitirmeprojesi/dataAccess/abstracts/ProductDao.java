package com.bluefashion.c2cbluefashionbitirmeprojesi.dataAccess.abstracts;

import com.bluefashion.c2cbluefashionbitirmeprojesi.entities.concrates.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDao extends JpaRepository<Product, Integer> {

    List<Product> getByCategory_CategoryId(Pageable pageable, int categoryId);

    List<Product> getByCategory_CategoryId(int categoryId);

    List<Product> getByBrand_BrandId(Pageable pageable, int brandId);

    List<Product> getByBrand_BrandId(int brandId);

    List<Product> getByUser_UserId(int userId);

    List<Product> getByUser_UserId(Pageable pageable, int userId);

    List<Product> getByColor_ColorId(Pageable pageable, int colorId);

    List<Product> getByColor_ColorId(int colorId);

    List<Product> getBySize_SizeId(Pageable pageable, int sizeId);

    List<Product> getBySize_SizeId(int sizeId);

    List<Product> getByProductDiscountPriceGreaterThanEqual(double price);

    List<Product> getByProductDiscountPriceLessThanEqual(double price);

    boolean existsByCategory_CategoryId(int categoryId);

    boolean existsByBrand_BrandId(int brandId);

    boolean existsByColor_ColorId(int colorId);

    boolean existsBySize_SizeId(int sizeId);

}
