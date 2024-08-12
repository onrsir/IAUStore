package com.bluefashion.c2cbluefashionbitirmeprojesi.api.controllers;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts.ColorService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.color.ColorGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.color.ColorListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.color.CreateColorRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.color.DeleteColorRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.color.UpdateColorRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/Colors")
public class ColorController {
    private ColorService colorService;

    @Autowired
    public ColorController(ColorService colorService) {
        this.colorService = colorService;
    }

    @GetMapping("/getAll")
    DataResult<List<ColorListDto>> getAll() {
        return this.colorService.getAll();
    }

    @GetMapping("getByColorId")
    DataResult<ColorGetDto> getByColorId(@RequestParam int colorId) throws BusinessException {
        return this.colorService.getByColorId(colorId);
    }

    @PostMapping("/add")
    Result add(@RequestBody @Valid CreateColorRequest createColorRequest) throws BusinessException {
        return this.colorService.add(createColorRequest);
    }

    @PutMapping("/update")
    Result update(@RequestBody @Valid UpdateColorRequest updateColorRequest) throws BusinessException {
        return this.colorService.update(updateColorRequest);
    }

    @DeleteMapping("/delete")
    Result delete(@RequestBody DeleteColorRequest deleteColorRequest) throws BusinessException {
        return this.colorService.delete(deleteColorRequest);
    }

    @GetMapping("/getAllPaged")
    DataResult<List<ColorListDto>> getAllPaged(@RequestParam int pageNo, @RequestParam int pageSize) {
        return this.colorService.getAllPaged(pageNo, pageSize);
    }

    @GetMapping("/getAllSorted")
    DataResult<List<ColorListDto>> getAllSorted(@RequestParam boolean sort) {
        return this.colorService.getAllSorted(sort);
    }
}
