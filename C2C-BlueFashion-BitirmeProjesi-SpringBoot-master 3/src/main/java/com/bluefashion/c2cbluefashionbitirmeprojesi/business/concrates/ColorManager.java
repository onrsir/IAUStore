package com.bluefashion.c2cbluefashionbitirmeprojesi.business.concrates;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts.ColorService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.color.ColorGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.color.ColorListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.color.CreateColorRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.color.DeleteColorRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.color.UpdateColorRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.mapping.ModelMapperService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.SuccessDataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.SucessResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.dataAccess.abstracts.ColorDao;
import com.bluefashion.c2cbluefashionbitirmeprojesi.entities.concrates.Color;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ColorManager implements ColorService {
    private ColorDao colorDao;
    private ModelMapperService modelMapperService;

    @Autowired
    public ColorManager(ColorDao colorDao, ModelMapperService modelMapperService) {
        this.colorDao = colorDao;
        this.modelMapperService = modelMapperService;
    }

    @Override
    public DataResult<List<ColorListDto>> getAll() {
        List<Color> response = this.colorDao.findAll();
        List<ColorListDto> result = response.stream()
                .map(color -> this.modelMapperService.forDto().map(color, ColorListDto.class))
                .collect(Collectors.toList());

        return new SuccessDataResult<>(result, "Renkler Listelendi..");
    }

    @Override
    public DataResult<ColorGetDto> getByColorId(int colorId) throws BusinessException {
        checkIfColorGetById(colorId);
        Color response = this.colorDao.getById(colorId);
        ColorGetDto result = this.modelMapperService.forDto().map(response, ColorGetDto.class);
        return new SuccessDataResult<>(result, colorId + " No'ya Ait Renk Getirildi..");
    }

    @Override
    public Result add(CreateColorRequest createColorRequest) throws BusinessException {
        checkIfColorName(createColorRequest.getColorName());
        Color result = this.modelMapperService.forRequest().map(createColorRequest, Color.class);
        this.colorDao.save(result);
        return new SucessResult(createColorRequest.getColorName() + " Başarıyla Eklendi..");
    }

    @Override
    public Result update(UpdateColorRequest updateColorRequest) throws BusinessException {

        Color result = this.modelMapperService.forRequest().map(updateColorRequest, Color.class);
        this.colorDao.save(result);
        return new SucessResult(updateColorRequest.getColorName() + " Başarıyla Güncellendi..");

    }

    @Override
    public Result delete(DeleteColorRequest deleteColorRequest) throws BusinessException {
        checkIfColorGetById(deleteColorRequest.getColorId());
        Color result = this.colorDao.getById(deleteColorRequest.getColorId());
        this.colorDao.delete(result);
        return new SucessResult(" Başarıyla Silindi..");
    }

    @Override
    public DataResult<List<ColorListDto>> getAllPaged(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        List<Color> response = this.colorDao.findAll(pageable).getContent();
        List<ColorListDto> result = response.stream()
                .map(color -> this.modelMapperService.forDto().map(color, ColorListDto.class))
                .collect(Collectors.toList());
        return new SuccessDataResult<>(result, "Renkler Listelendi..");
    }

    @Override
    public DataResult<List<ColorListDto>> getAllSorted(boolean sort) {
        Sort colorSort = Sort.by(ifSortConverter(sort), "ColorName");
        List<Color> response = this.colorDao.findAll(colorSort);
        List<ColorListDto> result = response.stream()
                .map(color -> this.modelMapperService.forDto().map(color, ColorListDto.class))
                .collect(Collectors.toList());
        return new SuccessDataResult<>(result, "Renkler Listelendi..");
    }

    public void checkIfColorGetById(int id) throws BusinessException {
        if (!this.colorDao.existsById(id)) {
            throw new BusinessException(id + "No'ya Ait Renk Bulunamadı..");
        }
    }

    private void checkIfColorName(String colorName) throws BusinessException {
        if (this.colorDao.existsByColorName(colorName)) {
            throw new BusinessException("Renk İsimleri Aynı olamaz.");
        }
    }

    private Sort.Direction ifSortConverter(boolean sort) {
        return sort ? Sort.Direction.ASC : Sort.Direction.DESC;
    }
}
