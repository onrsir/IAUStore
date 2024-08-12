package com.bluefashion.c2cbluefashionbitirmeprojesi.api.controllers;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts.AddressService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.address.AddressGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.address.AddressListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.address.CreateAddressRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.address.DeleteAddressRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.address.UpdateAddressRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/Addresss")
public class AddressController {
    private AddressService addressService;

    @Autowired
    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping("/getAll")
    DataResult<List<AddressListDto>> getAll() {
        return this.addressService.getAll();
    }

    @GetMapping("/getAddressListByUserId")
    DataResult<List<AddressListDto>> getAddressListByUserId(@RequestParam int userId) throws BusinessException {
        return this.addressService.getAddressListByUserId(userId);
    }

    @GetMapping("getByAddressId")
    DataResult<AddressGetDto> getByAddressId(@RequestParam int addressId) throws BusinessException {
        return this.addressService.getByAddressId(addressId);
    }

    @PostMapping("/add")
    Result add(@RequestBody @Valid CreateAddressRequest createAddressRequest) {
        return this.addressService.add(createAddressRequest);
    }

    @PutMapping("/update")
    Result update(@RequestBody @Valid UpdateAddressRequest updateAddressRequest) throws BusinessException {
        return this.addressService.update(updateAddressRequest);
    }

    @DeleteMapping("/delete")
    Result delete(@RequestBody DeleteAddressRequest deleteAddressRequest) throws BusinessException {
        return this.addressService.delete(deleteAddressRequest);
    }

    @GetMapping("/getAllPaged")
    DataResult<List<AddressListDto>> getAllPaged(@RequestParam int pageNo, @RequestParam int pageSize) {
        return this.addressService.getAllPaged(pageNo, pageSize);
    }

    @GetMapping("/getAllSorted")
    DataResult<List<AddressListDto>> getAllSorted(@RequestParam boolean sort) {
        return this.addressService.getAllSorted(sort);
    }
}
