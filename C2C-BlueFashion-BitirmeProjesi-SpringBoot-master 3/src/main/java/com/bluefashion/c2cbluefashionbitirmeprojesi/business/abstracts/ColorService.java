package com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.color.ColorGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.color.ColorListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.color.CreateColorRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.color.DeleteColorRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.color.UpdateColorRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;

import java.util.List;

public interface ColorService {
    DataResult<List<ColorListDto>> getAll();

    DataResult<ColorGetDto> getByColorId(int colorId) throws BusinessException;

    Result add(CreateColorRequest createColorRequest) throws BusinessException;

    Result update(UpdateColorRequest updateColorRequest) throws BusinessException;

    Result delete(DeleteColorRequest deleteColorRequest) throws BusinessException;

    DataResult<List<ColorListDto>> getAllPaged(int pageNo, int pageSize);

    DataResult<List<ColorListDto>> getAllSorted(boolean sort);

    void checkIfColorGetById(int id) throws BusinessException;

}
