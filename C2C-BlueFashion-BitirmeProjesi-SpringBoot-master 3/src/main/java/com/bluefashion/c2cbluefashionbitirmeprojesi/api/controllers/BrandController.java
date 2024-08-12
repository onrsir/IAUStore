package com.bluefashion.c2cbluefashionbitirmeprojesi.api.controllers;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts.BrandService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.brand.BrandGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.brand.BrandListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.brand.CreateBrandRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.brand.DeleteBrandRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.brand.UpdateBrandRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/Brands")
public class BrandController {
    private BrandService brandService;

    @Autowired
    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    @GetMapping("/getAll")
    DataResult<List<BrandListDto>> getAll() {
        return this.brandService.getAll();
    }

    @GetMapping("getByBrandId")
    DataResult<BrandGetDto> getByBrandId(@RequestParam int brandId) throws BusinessException {
        return this.brandService.getByBrandId(brandId);
    }

    @PostMapping("/add")
    Result add(@RequestBody @Valid CreateBrandRequest createBrandRequest) throws BusinessException {
        return this.brandService.add(createBrandRequest);
    }

    @PutMapping("/update")
    Result update(@RequestBody @Valid UpdateBrandRequest updateBrandRequest) throws BusinessException {
        return this.brandService.update(updateBrandRequest);
    }

    @DeleteMapping("/delete")
    Result delete(@RequestBody DeleteBrandRequest deleteBrandRequest) throws BusinessException {
        return this.brandService.delete(deleteBrandRequest);
    }

    @GetMapping("/getAllPaged")
    DataResult<List<BrandListDto>> getAllPaged(@RequestParam int pageNo, @RequestParam int pageSize) {
        return this.brandService.getAllPaged(pageNo, pageSize);
    }

    @GetMapping("/getAllSorted")
    DataResult<List<BrandListDto>> getAllSorted(@RequestParam boolean sort) {
        return this.brandService.getAllSorted(sort);
    }
}
