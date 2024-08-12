package com.bluefashion.c2cbluefashionbitirmeprojesi.business.concrates;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts.AddressService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts.UserService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.address.AddressGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.address.AddressListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.address.CreateAddressRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.address.DeleteAddressRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.address.UpdateAddressRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.mapping.ModelMapperService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.SuccessDataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.SucessResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.dataAccess.abstracts.AddressDao;
import com.bluefashion.c2cbluefashionbitirmeprojesi.entities.concrates.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AddressManager implements AddressService {
    private AddressDao addressDao;
    private ModelMapperService modelMapperService;
    private UserService userService;

    @Autowired
    public AddressManager(AddressDao addressDao, ModelMapperService modelMapperService, UserService userService) {
        this.addressDao = addressDao;
        this.modelMapperService = modelMapperService;
        this.userService = userService;
    }

    @Override
    public DataResult<List<AddressListDto>> getAll() {
        List<Address> response = this.addressDao.findAll();
        List<AddressListDto> result = response.stream()
                .map(address -> this.modelMapperService.forDto().map(address, AddressListDto.class))
                .collect(Collectors.toList());

        return new SuccessDataResult<>(result, "Adresler Listelendi..");
    }

    @Override
    public DataResult<List<AddressListDto>> getAddressListByUserId(int userId) throws BusinessException {
        this.userService.checkIfUserId(userId);
        List<Address> response = this.addressDao.getByUser_UserId(userId);
        List<AddressListDto> result = response.stream()
                .map(address -> this.modelMapperService.forDto().map(address, AddressListDto.class))
                .collect(Collectors.toList());

        return new SuccessDataResult<>(result, "Adresler Listelendi..");
    }

    @Override
    public DataResult<AddressGetDto> getByAddressId(int addressId) throws BusinessException {
        checkIfAddressGetById(addressId);
        Address response = this.addressDao.getById(addressId);
        AddressGetDto result = this.modelMapperService.forDto().map(response, AddressGetDto.class);
        return new SuccessDataResult<>(result, addressId + " No'ya Ait Adres Getirildi..");
    }

    @Override
    public Result add(CreateAddressRequest createAddressRequest) {

        Address result = this.modelMapperService.forRequest().map(createAddressRequest, Address.class);
        result.setAddressId(0);
        this.addressDao.save(result);

        return new SucessResult("Başarıyla Eklendi..");
    }

    @Override
    public Result update(UpdateAddressRequest updateAddressRequest) throws BusinessException {
        checkIfAddressGetById(updateAddressRequest.getAddressId());
        Address result = this.modelMapperService.forRequest().map(updateAddressRequest, Address.class);
        this.addressDao.save(result);
        return new SucessResult("Başarıyla Güncellendi..");

    }

    @Override
    public Result delete(DeleteAddressRequest deleteAddressRequest) throws BusinessException {
        checkIfAddressGetById(deleteAddressRequest.getAddressId());
        Address result = this.addressDao.getById(deleteAddressRequest.getAddressId());
        this.addressDao.delete(result);
        return new SucessResult(" Başarıyla Silindi..");
    }

    @Override
    public DataResult<List<AddressListDto>> getAllPaged(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        List<Address> response = this.addressDao.findAll(pageable).getContent();
        List<AddressListDto> result = response.stream()
                .map(address -> this.modelMapperService.forDto().map(address, AddressListDto.class))
                .collect(Collectors.toList());
        return new SuccessDataResult<>(result, "Adresler Listelendi..");
    }

    @Override
    public DataResult<List<AddressListDto>> getAllSorted(boolean sort) {
        Sort addressSort = Sort.by(ifSortConverter(sort), "AddressTitle");
        List<Address> response = this.addressDao.findAll(addressSort);
        List<AddressListDto> result = response.stream()
                .map(address -> this.modelMapperService.forDto().map(address, AddressListDto.class))
                .collect(Collectors.toList());
        return new SuccessDataResult<>(result, "Adresler Listelendi..");
    }

    public void checkIfAddressGetById(int id) throws BusinessException {
        if (!this.addressDao.existsById(id)) {
            throw new BusinessException(id + " No'ya Ait Adres Bulunamadı..");
        }
    }

    private Sort.Direction ifSortConverter(boolean sort) {
        return sort ? Sort.Direction.ASC : Sort.Direction.DESC;
    }
}
