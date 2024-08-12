package com.bluefashion.c2cbluefashionbitirmeprojesi.business.concrates;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts.ShippingService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.shipping.ShippingGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.shipping.ShippingListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.shipping.CreateShippingRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.shipping.DeleteShippingRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.shipping.UpdateShippingRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.mapping.ModelMapperService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.SuccessDataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.SucessResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.dataAccess.abstracts.ShippingDao;
import com.bluefashion.c2cbluefashionbitirmeprojesi.entities.concrates.Shipping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShippingManager implements ShippingService {
    private ShippingDao shippingDao;
    private ModelMapperService modelMapperService;

    @Autowired
    public ShippingManager(ShippingDao shippingDao, ModelMapperService modelMapperService) {
        this.shippingDao = shippingDao;
        this.modelMapperService = modelMapperService;
    }

    @Override
    public DataResult<List<ShippingListDto>> getAll() {
        List<Shipping> response = this.shippingDao.findAll();
        List<ShippingListDto> result = response.stream()
                .map(shipping -> this.modelMapperService.forDto().map(shipping, ShippingListDto.class))
                .collect(Collectors.toList());

        return new SuccessDataResult<>(result, "Gönderiler Listelendi..");
    }

    @Override
    public DataResult<ShippingGetDto> getByShippingId(int shippingId) throws BusinessException {
        checkIfShippingGetById(shippingId);
        Shipping response = this.shippingDao.getById(shippingId);
        ShippingGetDto result = this.modelMapperService.forDto().map(response, ShippingGetDto.class);
        return new SuccessDataResult<>(result, shippingId + " No'ya Ait Gönderi Getirildi..");
    }

    @Override
    public Result add(CreateShippingRequest createShippingRequest) {

        Shipping result = this.modelMapperService.forRequest().map(createShippingRequest, Shipping.class);
        this.shippingDao.save(result);
        return new SucessResult(" Başarıyla Eklendi..");
    }

    @Override
    public Result update(UpdateShippingRequest updateShippingRequest) throws BusinessException {
        checkIfShippingGetById(updateShippingRequest.getShippingId());
        Shipping result = this.modelMapperService.forRequest().map(updateShippingRequest, Shipping.class);
        this.shippingDao.save(result);
        return new SucessResult(" Başarıyla Güncellendi..");

    }

    @Override
    public Result delete(DeleteShippingRequest deleteShippingRequest) throws BusinessException {
        checkIfShippingGetById(deleteShippingRequest.getShippingId());
        Shipping result = this.shippingDao.getById(deleteShippingRequest.getShippingId());
        this.shippingDao.delete(result);
        return new SucessResult(" Başarıyla Silindi..");
    }

    @Override
    public DataResult<List<ShippingListDto>> getAllPaged(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        List<Shipping> response = this.shippingDao.findAll(pageable).getContent();
        List<ShippingListDto> result = response.stream()
                .map(shipping -> this.modelMapperService.forDto().map(shipping, ShippingListDto.class))
                .collect(Collectors.toList());
        return new SuccessDataResult<>(result, "Gönderiler Listelendi..");
    }

    @Override
    public DataResult<List<ShippingListDto>> getAllSorted(boolean sort) {
        Sort shippingSort = Sort.by(ifSortConverter(sort), "ShippingTrackingNumber");
        List<Shipping> response = this.shippingDao.findAll(shippingSort);
        List<ShippingListDto> result = response.stream()
                .map(shipping -> this.modelMapperService.forDto().map(shipping, ShippingListDto.class))
                .collect(Collectors.toList());
        return new SuccessDataResult<>(result, "Gönderiler Listelendi..");
    }

    public void checkIfShippingGetById(int id) throws BusinessException {
        if (!this.shippingDao.existsById(id)) {
            throw new BusinessException(id + " No'ya Ait Gönderi Bulunamadı..");
        }
    }

    private Sort.Direction ifSortConverter(boolean sort) {
        return sort ? Sort.Direction.ASC : Sort.Direction.DESC;
    }
}
