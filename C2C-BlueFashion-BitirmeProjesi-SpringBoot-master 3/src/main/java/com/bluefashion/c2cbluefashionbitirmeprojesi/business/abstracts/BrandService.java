package com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.brand.BrandGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.brand.BrandListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.brand.CreateBrandRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.brand.DeleteBrandRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.brand.UpdateBrandRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;

import java.util.List;

public interface BrandService {
    DataResult<List<BrandListDto>> getAll();

    DataResult<BrandGetDto> getByBrandId(int brandId) throws BusinessException;

    Result add(CreateBrandRequest createBrandRequest) throws BusinessException;

    Result update(UpdateBrandRequest updateBrandRequest) throws BusinessException;

    Result delete(DeleteBrandRequest deleteBrandRequest) throws BusinessException;

    DataResult<List<BrandListDto>> getAllPaged(int pageNo, int pageSize);

    DataResult<List<BrandListDto>> getAllSorted(boolean sort);

    void checkIfBrandGetById(int id) throws BusinessException;

}
