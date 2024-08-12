package com.bluefashion.c2cbluefashionbitirmeprojesi.business.concrates;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts.BrandService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.brand.BrandGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.brand.BrandListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.brand.CreateBrandRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.brand.DeleteBrandRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.brand.UpdateBrandRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.mapping.ModelMapperService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.SuccessDataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.SucessResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.dataAccess.abstracts.BrandDao;
import com.bluefashion.c2cbluefashionbitirmeprojesi.entities.concrates.Brand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BrandManager implements BrandService {
    private BrandDao brandDao;
    private ModelMapperService modelMapperService;

    @Autowired
    public BrandManager(BrandDao brandDao, ModelMapperService modelMapperService) {
        this.brandDao = brandDao;
        this.modelMapperService = modelMapperService;
    }

    @Override
    public DataResult<List<BrandListDto>> getAll() {
        List<Brand> response = this.brandDao.findAll();
        List<BrandListDto> result = response.stream()
                .map(brand -> this.modelMapperService.forDto().map(brand, BrandListDto.class))
                .collect(Collectors.toList());

        return new SuccessDataResult<>(result, "Markalar Listelendi..");
    }

    @Override
    public DataResult<BrandGetDto> getByBrandId(int brandId) throws BusinessException {
        checkIfBrandGetById(brandId);
        Brand response = this.brandDao.getById(brandId);
        BrandGetDto result = this.modelMapperService.forDto().map(response, BrandGetDto.class);
        return new SuccessDataResult<>(result, brandId + " No'ya Ait Marka Getirildi..");
    }

    @Override
    public Result add(CreateBrandRequest createBrandRequest) throws BusinessException {
        checkIfBrandName(createBrandRequest.getBrandName());
        Brand result = this.modelMapperService.forRequest().map(createBrandRequest, Brand.class);
        this.brandDao.save(result);
        return new SucessResult(createBrandRequest.getBrandName() + " Başarıyla Eklendi..");
    }

    @Override
    public Result update(UpdateBrandRequest updateBrandRequest) throws BusinessException {

        Brand result = this.modelMapperService.forRequest().map(updateBrandRequest, Brand.class);
        this.brandDao.save(result);
        return new SucessResult(updateBrandRequest.getBrandName() + " Başarıyla Güncellendi..");

    }

    @Override
    public Result delete(DeleteBrandRequest deleteBrandRequest) throws BusinessException {
        checkIfBrandGetById(deleteBrandRequest.getBrandId());
        Brand result = this.brandDao.getById(deleteBrandRequest.getBrandId());
        this.brandDao.delete(result);
        return new SucessResult(" Başarıyla Silindi..");
    }

    @Override
    public DataResult<List<BrandListDto>> getAllPaged(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        List<Brand> response = this.brandDao.findAll(pageable).getContent();
        List<BrandListDto> result = response.stream()
                .map(brand -> this.modelMapperService.forDto().map(brand, BrandListDto.class))
                .collect(Collectors.toList());
        return new SuccessDataResult<>(result, "Markalar Listelendi..");
    }

    @Override
    public DataResult<List<BrandListDto>> getAllSorted(boolean sort) {
        Sort brandSort = Sort.by(ifSortConverter(sort), "BrandName");
        List<Brand> response = this.brandDao.findAll(brandSort);
        List<BrandListDto> result = response.stream()
                .map(brand -> this.modelMapperService.forDto().map(brand, BrandListDto.class))
                .collect(Collectors.toList());
        return new SuccessDataResult<>(result, "Markalar Listelendi..");
    }

    public void checkIfBrandGetById(int id) throws BusinessException {
        if (!this.brandDao.existsById(id)) {
            throw new BusinessException(id + "No'ya Ait Marka Bulunamadı..");
        }
    }

    private void checkIfBrandName(String brandName) throws BusinessException {
        if (this.brandDao.existsByBrandName(brandName)) {
            throw new BusinessException("Marka İsimleri Aynı olamaz.");
        }
    }

    private Sort.Direction ifSortConverter(boolean sort) {
        return sort ? Sort.Direction.ASC : Sort.Direction.DESC;
    }
}
