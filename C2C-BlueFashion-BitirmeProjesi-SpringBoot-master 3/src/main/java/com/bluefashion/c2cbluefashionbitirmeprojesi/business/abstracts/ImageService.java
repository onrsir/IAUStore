package com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.image.ImageGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.image.ImageListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.image.CreateImageRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.image.DeleteImageRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.image.UpdateImageRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;

import java.io.IOException;
import java.util.List;

public interface ImageService {
    DataResult<List<ImageListDto>> getAll();

    DataResult<ImageGetDto> getByImageId(int imageId) throws BusinessException;

    Result add(CreateImageRequest createImageRequest) throws IOException;


    Result update(UpdateImageRequest updateImageRequest) throws BusinessException, IOException;

    Result delete(DeleteImageRequest deleteImageRequest) throws BusinessException;

    DataResult<List<ImageListDto>> getAllPaged(int pageNo, int pageSize);

    DataResult<List<ImageListDto>> getAllSorted(boolean sort);

    void checkIfImageGetById(int id) throws BusinessException;

}
