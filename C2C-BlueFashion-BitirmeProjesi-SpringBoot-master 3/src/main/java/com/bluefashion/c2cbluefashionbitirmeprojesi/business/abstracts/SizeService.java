package com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.size.SizeGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.size.SizeListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.size.CreateSizeRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.size.DeleteSizeRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.size.UpdateSizeRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;

import java.util.List;

public interface SizeService {
    DataResult<List<SizeListDto>> getAll();

    DataResult<SizeGetDto> getBySizeId(int sizeId) throws BusinessException;

    Result add(CreateSizeRequest createSizeRequest) throws BusinessException;

    Result update(UpdateSizeRequest updateSizeRequest) throws BusinessException;

    Result delete(DeleteSizeRequest deleteSizeRequest) throws BusinessException;

    DataResult<List<SizeListDto>> getAllPaged(int pageNo, int pageSize);

    DataResult<List<SizeListDto>> getAllSorted(boolean sort);

    void checkIfSizeGetById(int id) throws BusinessException;

}
