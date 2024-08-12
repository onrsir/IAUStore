package com.bluefashion.c2cbluefashionbitirmeprojesi.business.concrates;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts.SizeService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.size.SizeGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.size.SizeListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.size.CreateSizeRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.size.DeleteSizeRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.size.UpdateSizeRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.mapping.ModelMapperService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.SuccessDataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.SucessResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.dataAccess.abstracts.SizeDao;
import com.bluefashion.c2cbluefashionbitirmeprojesi.entities.concrates.Size;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SizeManager implements SizeService {
    private SizeDao sizeDao;
    private ModelMapperService modelMapperService;

    @Autowired
    public SizeManager(SizeDao sizeDao, ModelMapperService modelMapperService) {
        this.sizeDao = sizeDao;
        this.modelMapperService = modelMapperService;
    }

    @Override
    public DataResult<List<SizeListDto>> getAll() {
        List<Size> response = this.sizeDao.findAll();
        List<SizeListDto> result = response.stream()
                .map(size -> this.modelMapperService.forDto().map(size, SizeListDto.class))
                .collect(Collectors.toList());

        return new SuccessDataResult<>(result, "Bedenler Listelendi..");
    }

    @Override
    public DataResult<SizeGetDto> getBySizeId(int sizeId) throws BusinessException {
        checkIfSizeGetById(sizeId);
        Size response = this.sizeDao.getById(sizeId);
        SizeGetDto result = this.modelMapperService.forDto().map(response, SizeGetDto.class);
        return new SuccessDataResult<>(result, sizeId + " No'ya Ait Beden Getirildi..");
    }

    @Override
    public Result add(CreateSizeRequest createSizeRequest) throws BusinessException {
        checkIfSizeName(createSizeRequest.getSizeName());
        Size result = this.modelMapperService.forRequest().map(createSizeRequest, Size.class);
        result.setSizeId(0);
        this.sizeDao.save(result);
        return new SucessResult(createSizeRequest.getSizeName() + " Başarıyla Eklendi..");
    }

    @Override
    public Result update(UpdateSizeRequest updateSizeRequest) throws BusinessException {

        Size result = this.modelMapperService.forRequest().map(updateSizeRequest, Size.class);
        this.sizeDao.save(result);
        return new SucessResult(updateSizeRequest.getSizeName() + " Başarıyla Güncellendi..");

    }

    @Override
    public Result delete(DeleteSizeRequest deleteSizeRequest) throws BusinessException {
        checkIfSizeGetById(deleteSizeRequest.getSizeId());
        Size result = this.sizeDao.getById(deleteSizeRequest.getSizeId());
        this.sizeDao.delete(result);
        return new SucessResult(" Başarıyla Silindi..");
    }

    @Override
    public DataResult<List<SizeListDto>> getAllPaged(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        List<Size> response = this.sizeDao.findAll(pageable).getContent();
        List<SizeListDto> result = response.stream()
                .map(size -> this.modelMapperService.forDto().map(size, SizeListDto.class))
                .collect(Collectors.toList());
        return new SuccessDataResult<>(result, "Bedenler Listelendi..");
    }

    @Override
    public DataResult<List<SizeListDto>> getAllSorted(boolean sort) {
        Sort sizeSort = Sort.by(ifSortConverter(sort), "SizeName");
        List<Size> response = this.sizeDao.findAll(sizeSort);
        List<SizeListDto> result = response.stream()
                .map(size -> this.modelMapperService.forDto().map(size, SizeListDto.class))
                .collect(Collectors.toList());
        return new SuccessDataResult<>(result, "Bedenler Listelendi..");
    }

    public void checkIfSizeGetById(int id) throws BusinessException {
        if (!this.sizeDao.existsById(id)) {
            throw new BusinessException(id + "No'ya Ait Beden Bulunamadı..");
        }
    }

    private void checkIfSizeName(String sizeName) throws BusinessException {
        if (this.sizeDao.existsBySizeName(sizeName)) {
            throw new BusinessException("Beden İsimleri Aynı olamaz.");
        }
    }

    private Sort.Direction ifSortConverter(boolean sort) {
        return sort ? Sort.Direction.ASC : Sort.Direction.DESC;
    }
}
