package com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.product.ProductGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.product.ProductGetSinglePageDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.product.ProductListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.product.CreateProductRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.product.DeleteProductRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.product.UpdateProductRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;

import java.util.List;

public interface ProductService {
    DataResult<List<ProductListDto>> getAll();

    DataResult<ProductGetDto> getByProductId(int productId) throws BusinessException;

    DataResult<ProductGetSinglePageDto> getSinglePageByProductId(int productId) throws BusinessException;

    Result add(CreateProductRequest createProductRequest) throws BusinessException;

    Result update(UpdateProductRequest updateProductRequest) throws BusinessException;

    Result delete(DeleteProductRequest deleteProductRequest) throws BusinessException;

    DataResult<List<ProductListDto>> getAllPaged(int pageNo, int pageSize, String sortTitle, boolean sort);

    DataResult<List<ProductListDto>> getAllSorted(boolean sort);


    DataResult<List<ProductListDto>> getProductByCategoryId(int pageNo, int pageSize, String sortTitle, boolean sort, int categoryId) throws BusinessException;

    DataResult<List<ProductListDto>> getProductByUserId(int pageNo, int pageSize, String sortTitle, boolean sort, int userId) throws BusinessException;

    DataResult<List<ProductListDto>> getProductByColorId(int pageNo, int pageSize, String sortTitle, boolean sort, int colorId) throws BusinessException;

    DataResult<List<ProductListDto>> getProductByBrandId(int pageNo, int pageSize, String sortTitle, boolean sort, int brandId) throws BusinessException;

    DataResult<List<ProductListDto>> getProductBySizeId(int pageNo, int pageSize, String sortTitle, boolean sort, int sizeId) throws BusinessException;

    DataResult<List<ProductListDto>> getProductByGreaterPrice(double price) throws BusinessException;

    DataResult<List<ProductListDto>> getProductByLessPrice(double price) throws BusinessException;


    DataResult<List<?>> getProductCategoryList();

    DataResult<List<?>> getProductBrandList();

    DataResult<List<?>> getProductColorList();

    DataResult<List<?>> getProductSizeList();

    DataResult<List<ProductListDto>> getProductByCategoryList();


    void checkIfProductGetById(int id) throws BusinessException;

}
