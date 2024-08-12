package com.bluefashion.c2cbluefashionbitirmeprojesi.api.controllers;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts.ShippingService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.shipping.ShippingGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.shipping.ShippingListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.shipping.CreateShippingRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.shipping.DeleteShippingRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.shipping.UpdateShippingRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/Shippings")
public class ShippingController {
    private ShippingService shippingService;

    @Autowired
    public ShippingController(ShippingService shippingService) {
        this.shippingService = shippingService;
    }

    @GetMapping("/getAll")
    DataResult<List<ShippingListDto>> getAll() {
        return this.shippingService.getAll();
    }

    @GetMapping("getByShippingId")
    DataResult<ShippingGetDto> getByShippingId(@RequestParam int shippingId) throws BusinessException {
        return this.shippingService.getByShippingId(shippingId);
    }

    @PostMapping("/add")
    Result add(@RequestBody @Valid CreateShippingRequest createShippingRequest) {
        return this.shippingService.add(createShippingRequest);
    }

    @PutMapping("/update")
    Result update(@RequestBody @Valid UpdateShippingRequest updateShippingRequest) throws BusinessException {
        return this.shippingService.update(updateShippingRequest);
    }

    @DeleteMapping("/delete")
    Result delete(@RequestBody DeleteShippingRequest deleteShippingRequest) throws BusinessException {
        return this.shippingService.delete(deleteShippingRequest);
    }

    @GetMapping("/getAllPaged")
    DataResult<List<ShippingListDto>> getAllPaged(@RequestParam int pageNo, @RequestParam int pageSize) {
        return this.shippingService.getAllPaged(pageNo, pageSize);
    }

    @GetMapping("/getAllSorted")
    DataResult<List<ShippingListDto>> getAllSorted(@RequestParam boolean sort) {
        return this.shippingService.getAllSorted(sort);
    }
}
