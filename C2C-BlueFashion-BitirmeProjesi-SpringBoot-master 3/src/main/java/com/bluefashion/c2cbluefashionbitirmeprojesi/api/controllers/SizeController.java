package com.bluefashion.c2cbluefashionbitirmeprojesi.api.controllers;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts.SizeService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.size.SizeGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.size.SizeListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.size.CreateSizeRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.size.DeleteSizeRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.size.UpdateSizeRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/Sizes")
public class SizeController {
    private SizeService sizeService;

    @Autowired
    public SizeController(SizeService sizeService) {
        this.sizeService = sizeService;
    }

    @GetMapping("/getAll")
    DataResult<List<SizeListDto>> getAll() {
        return this.sizeService.getAll();
    }

    @GetMapping("getBySizeId")
    DataResult<SizeGetDto> getBySizeId(@RequestParam int sizeId) throws BusinessException {
        return this.sizeService.getBySizeId(sizeId);
    }

    @PostMapping("/add")
    Result add(@RequestBody @Valid CreateSizeRequest createSizeRequest) throws BusinessException {
        return this.sizeService.add(createSizeRequest);
    }

    @PutMapping("/update")
    Result update(@RequestBody @Valid UpdateSizeRequest updateSizeRequest) throws BusinessException {
        return this.sizeService.update(updateSizeRequest);
    }

    @DeleteMapping("/delete")
    Result delete(@RequestBody DeleteSizeRequest deleteSizeRequest) throws BusinessException {
        return this.sizeService.delete(deleteSizeRequest);
    }

    @GetMapping("/getAllPaged")
    DataResult<List<SizeListDto>> getAllPaged(@RequestParam int pageNo, @RequestParam int pageSize) {
        return this.sizeService.getAllPaged(pageNo, pageSize);
    }

    @GetMapping("/getAllSorted")
    DataResult<List<SizeListDto>> getAllSorted(@RequestParam boolean sort) {
        return this.sizeService.getAllSorted(sort);
    }
}
