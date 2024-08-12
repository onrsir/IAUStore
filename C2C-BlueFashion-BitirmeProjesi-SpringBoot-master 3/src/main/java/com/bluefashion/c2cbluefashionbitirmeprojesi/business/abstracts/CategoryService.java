package com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.category.CategoryGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.category.CategoryListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.category.CreateCategoryRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.category.DeleteCategoryRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.category.UpdateCategoryRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;

import java.util.List;

public interface CategoryService {
    DataResult<List<CategoryListDto>> getAll();

    DataResult<CategoryGetDto> getByCategoryId(int categoryId) throws BusinessException;

    Result add(CreateCategoryRequest createCategoryRequest) throws BusinessException;

    Result update(UpdateCategoryRequest updateCategoryRequest) throws BusinessException;

    Result delete(DeleteCategoryRequest deleteCategoryRequest) throws BusinessException;

    DataResult<List<CategoryListDto>> getCategoryByParentId(int parentId) throws BusinessException;

    DataResult<List<CategoryListDto>> getAllPaged(int pageNo, int pageSize);

    DataResult<List<CategoryListDto>> getAllSorted(boolean sort);

    void checkIfCategoryGetById(int id) throws BusinessException;

}
