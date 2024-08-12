package com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.shipping.ShippingGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.shipping.ShippingListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.shipping.CreateShippingRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.shipping.DeleteShippingRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.shipping.UpdateShippingRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;

import java.util.List;

public interface ShippingService {
    DataResult<List<ShippingListDto>> getAll();

    DataResult<ShippingGetDto> getByShippingId(int shippingId) throws BusinessException;

    Result add(CreateShippingRequest createShippingRequest);

    Result update(UpdateShippingRequest updateShippingRequest) throws BusinessException;

    Result delete(DeleteShippingRequest deleteShippingRequest) throws BusinessException;

    DataResult<List<ShippingListDto>> getAllPaged(int pageNo, int pageSize);

    DataResult<List<ShippingListDto>> getAllSorted(boolean sort);

    void checkIfShippingGetById(int id) throws BusinessException;

}
