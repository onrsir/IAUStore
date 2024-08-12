package com.bluefashion.c2cbluefashionbitirmeprojesi.business.concrates;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts.CategoryService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.category.CategoryGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.category.CategoryListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.category.CreateCategoryRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.category.DeleteCategoryRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.category.UpdateCategoryRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.mapping.ModelMapperService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.SuccessDataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.SucessResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.dataAccess.abstracts.CategoryDao;
import com.bluefashion.c2cbluefashionbitirmeprojesi.entities.concrates.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryManager implements CategoryService {
    private CategoryDao categoryDao;
    private ModelMapperService modelMapperService;

    @Autowired
    public CategoryManager(CategoryDao categoryDao, ModelMapperService modelMapperService) {
        this.categoryDao = categoryDao;
        this.modelMapperService = modelMapperService;
    }

    @Override
    public DataResult<List<CategoryListDto>> getAll() {
        List<Category> response = this.categoryDao.findAll();
        List<CategoryListDto> result = response.stream()
                .map(category -> this.modelMapperService.forDto().map(category, CategoryListDto.class))
                .collect(Collectors.toList());

        return new SuccessDataResult<>(result, "Kategoriler Listelendi..");
    }

    @Override
    public DataResult<CategoryGetDto> getByCategoryId(int categoryId) throws BusinessException {
        checkIfCategoryGetById(categoryId);
        Category response = this.categoryDao.getById(categoryId);
        CategoryGetDto result = this.modelMapperService.forDto().map(response, CategoryGetDto.class);
        return new SuccessDataResult<>(result, categoryId + " No'ya Ait Kategori Getirildi..");
    }

    @Override
    public Result add(CreateCategoryRequest createCategoryRequest) throws BusinessException {
        checkIfCategoryName(createCategoryRequest.getCategoryName());
        //category id 0 ise id kontrolu yapma çünkü id 0 sa parent degeri yoktur
        if (createCategoryRequest.getParent_CategoryId() != 0) {
            checkIfCategoryGetById(createCategoryRequest.getParent_CategoryId());

        }
        //-------------------------------------------------------------------------
        Category result = this.modelMapperService.forRequest().map(createCategoryRequest, Category.class);
        //Model Mapper Sınıfında bir karışıklık oluyor isimler yüzünden onu önlemek için manuel olarak ekleme yapılıyor
        result.setCategoryId(0);
        if (createCategoryRequest.getParent_CategoryId() != 0) {
            result.setParent(this.categoryDao.getById(createCategoryRequest.getParent_CategoryId()));

        }

        //-------------------------------------------------------------------------------------------------------------
        this.categoryDao.save(result);
        return new SucessResult(createCategoryRequest.getCategoryName() + " Başarıyla Eklendi..");
    }

    @Override
    public DataResult<List<CategoryListDto>> getCategoryByParentId(int parentId) throws BusinessException {
        checkIfCategoryGetById(parentId);
        List<Category> response = this.categoryDao.getByParent_CategoryId(parentId);
        List<CategoryListDto> result = response.stream()
                .map(category -> this.modelMapperService.forDto().map(category, CategoryListDto.class))
                .collect(Collectors.toList());

        return new SuccessDataResult<>(result, "Kategoriler Listelendi..");
    }

    @Override
    public Result update(UpdateCategoryRequest updateCategoryRequest) throws BusinessException {


        //category id 0 ise id kontrolu yapma çünkü id 0 sa parent degeri yoktur
        if (updateCategoryRequest.getParent_CategoryId() != 0) {
            checkIfCategoryGetById(updateCategoryRequest.getParent_CategoryId());
        }
        //-------------------------------------------------------------------------
        Category result = this.modelMapperService.forRequest().map(updateCategoryRequest, Category.class);
        //Model Mapper Sınıfında bir karışıklık oluyor isimler yüzünden onu önlemek için manuel olarak ekleme yapılıyor
        if (updateCategoryRequest.getParent_CategoryId() != 0) {
            result.setParent(this.categoryDao.getById(updateCategoryRequest.getParent_CategoryId()));
        }

        //-------------------------------------------------------------------------------------------------------------
        this.categoryDao.save(result);
        return new SucessResult(updateCategoryRequest.getCategoryName() + " Başarıyla Güncellendi..");

    }

    @Override
    public Result delete(DeleteCategoryRequest deleteCategoryRequest) throws BusinessException {
        checkIfCategoryGetById(deleteCategoryRequest.getCategoryId());
        Category result = this.categoryDao.getById(deleteCategoryRequest.getCategoryId());
        this.categoryDao.delete(result);
        return new SucessResult(" Başarıyla Silindi..");
    }

    @Override
    public DataResult<List<CategoryListDto>> getAllPaged(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        List<Category> response = this.categoryDao.findAll(pageable).getContent();
        List<CategoryListDto> result = response.stream()
                .map(category -> this.modelMapperService.forDto().map(category, CategoryListDto.class))
                .collect(Collectors.toList());
        return new SuccessDataResult<>(result, "Kategoriler Listelendi..");
    }

    @Override
    public DataResult<List<CategoryListDto>> getAllSorted(boolean sort) {
        Sort categorySort = Sort.by(ifSortConverter(sort), "CategoryName");
        List<Category> response = this.categoryDao.findAll(categorySort);
        List<CategoryListDto> result = response.stream()
                .map(category -> this.modelMapperService.forDto().map(category, CategoryListDto.class))
                .collect(Collectors.toList());
        return new SuccessDataResult<>(result, "Kategoriler Listelendi..");
    }

    public void checkIfCategoryGetById(int id) throws BusinessException {
        if (!this.categoryDao.existsById(id)) {
            throw new BusinessException(id + "No'lu Kategori Bulunamadı");
        }
    }

    private void checkIfCategoryName(String categoryName) throws BusinessException {
        if (this.categoryDao.existsByCategoryName(categoryName)) {
            throw new BusinessException("Kategori isimleri Aynı olamaz");
        }
    }

    private Sort.Direction ifSortConverter(boolean sort) {
        return sort ? Sort.Direction.ASC : Sort.Direction.DESC;
    }
}
