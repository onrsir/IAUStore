package com.bluefashion.c2cbluefashionbitirmeprojesi.business.concrates;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts.*;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.brand.BrandListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.category.CategoryListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.color.ColorListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.product.ProductGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.product.ProductGetSinglePageDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.product.ProductListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.size.SizeListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.product.CreateProductRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.product.DeleteProductRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.product.UpdateProductRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.mapping.ModelMapperService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.SuccessDataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.SucessResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.dataAccess.abstracts.ProductDao;
import com.bluefashion.c2cbluefashionbitirmeprojesi.entities.concrates.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductManager implements ProductService {
    private ProductDao productDao;
    private ModelMapperService modelMapperService;
    private CategoryService categoryService;
    private UserService userService;
    private ColorService colorService;
    private BrandService brandService;
    private SizeService sizeService;

    @Autowired
    public ProductManager(ProductDao productDao,
                          ModelMapperService modelMapperService,
                          CategoryService categoryService,
                          UserService userService,
                          ColorService colorService,
                          BrandService brandService,
                          SizeService sizeService) {
        this.productDao = productDao;
        this.modelMapperService = modelMapperService;
        this.categoryService = categoryService;
        this.userService = userService;
        this.colorService = colorService;
        this.brandService = brandService;
        this.sizeService = sizeService;
    }

    @Override
    public DataResult<List<ProductListDto>> getAll() {
        List<Product> response = this.productDao.findAll();
        List<ProductListDto> result = response.stream()
                .map(product -> this.modelMapperService.forDto().map(product, ProductListDto.class))
                .collect(Collectors.toList());

        return new SuccessDataResult<>(result, "Ürünlerler Listelendi..");
    }

    @Override
    public DataResult<ProductGetDto> getByProductId(int productId) throws BusinessException {
        checkIfProductGetById(productId);
        Product response = this.productDao.getById(productId);
        ProductGetDto result = this.modelMapperService.forDto().map(response, ProductGetDto.class);
        return new SuccessDataResult<>(result, productId + " No'ya Ait Ürünler Getirildi..");
    }

    @Override
    public DataResult<ProductGetSinglePageDto> getSinglePageByProductId(int productId) throws BusinessException {
        checkIfProductGetById(productId);
        Product response = this.productDao.getById(productId);
        ProductGetSinglePageDto result = this.modelMapperService.forDto().map(response, ProductGetSinglePageDto.class);
        return new SuccessDataResult<>(result, productId + " No'ya Ait Ürünler Getirildi..");
    }

    @Override
    public Result add(CreateProductRequest createProductRequest) throws BusinessException {
        this.brandService.checkIfBrandGetById(createProductRequest.getBrandId());
        this.categoryService.checkIfCategoryGetById(createProductRequest.getCategoryId());
        this.colorService.checkIfColorGetById(createProductRequest.getColorId());
        this.sizeService.checkIfSizeGetById(createProductRequest.getSizeId());
        this.userService.checkIfUserId(createProductRequest.getUserId());

        Product result = this.modelMapperService.forRequest().map(createProductRequest, Product.class);
        result.setProductId(0);
        this.productDao.save(result);
        return new SucessResult(createProductRequest.getProductTitle() + " Başarıyla Eklendi..");
    }

    @Override
    public Result update(UpdateProductRequest updateProductRequest) throws BusinessException {
        this.brandService.checkIfBrandGetById(updateProductRequest.getBrandId());
        this.categoryService.checkIfCategoryGetById(updateProductRequest.getCategoryId());
        this.colorService.checkIfColorGetById(updateProductRequest.getColorId());
        this.sizeService.checkIfSizeGetById(updateProductRequest.getSizeId());
        this.userService.checkIfUserId(updateProductRequest.getUserId());

        Product result = this.modelMapperService.forRequest().map(updateProductRequest, Product.class);
        this.productDao.save(result);
        return new SucessResult(updateProductRequest.getProductTitle() + " Başarıyla Güncellendi..");

    }

    @Override
    public Result delete(DeleteProductRequest deleteProductRequest) throws BusinessException {
        checkIfProductGetById(deleteProductRequest.getProductId());
        Product result = this.productDao.getById(deleteProductRequest.getProductId());
        this.productDao.delete(result);
        return new SucessResult(" Başarıyla Silindi..");
    }

    @Override
    public DataResult<List<ProductListDto>> getAllPaged(int pageNo, int pageSize, String sortTitle, boolean sort) {
        int dataSize = this.productDao.findAll().size();
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, Sort.by(ifSortConverter(sort), sortTitle));
        List<Product> response = this.productDao.findAll(pageable).getContent();
        List<ProductListDto> result = response.stream()
                .map(product -> this.modelMapperService.forDto().map(product, ProductListDto.class))
                .collect(Collectors.toList());
        return new SuccessDataResult<>(result, "Ürünlerler Listelendi..", dataSize);
    }

    @Override
    public DataResult<List<ProductListDto>> getAllSorted(boolean sort) {
        Sort productSort = Sort.by(ifSortConverter(sort), "ProductTitle");
        List<Product> response = this.productDao.findAll(productSort);
        List<ProductListDto> result = response.stream()
                .map(product -> this.modelMapperService.forDto().map(product, ProductListDto.class))
                .collect(Collectors.toList());
        return new SuccessDataResult<>(result, "Ürünlerler Listelendi..");
    }


    @Override
    public DataResult<List<ProductListDto>> getProductByCategoryId(int pageNo, int pageSize, String sortTitle, boolean sort, int categoryId) throws BusinessException {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, Sort.by(ifSortConverter(sort), sortTitle));
        this.categoryService.checkIfCategoryGetById(categoryId);
        int dataSize = this.productDao.getByCategory_CategoryId(categoryId).size();
        List<Product> response = this.productDao.getByCategory_CategoryId(pageable, categoryId);
        List<ProductListDto> result = response.stream()
                .map(product -> this.modelMapperService.forDto().map(product, ProductListDto.class))
                .collect(Collectors.toList());

        return new SuccessDataResult<>(result, "Ürünlerler Listelendi..", dataSize);
    }

    @Override
    public DataResult<List<ProductListDto>> getProductByUserId(int pageNo, int pageSize, String sortTitle, boolean sort, int userId) throws BusinessException {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, Sort.by(ifSortConverter(sort), sortTitle));
        this.userService.checkIfUserId(userId);
        int dataSize = this.productDao.getByUser_UserId(userId).size();
        List<Product> response = this.productDao.getByUser_UserId(pageable, userId);
        List<ProductListDto> result = response.stream()
                .map(product -> this.modelMapperService.forDto().map(product, ProductListDto.class))
                .collect(Collectors.toList());

        return new SuccessDataResult<>(result, "Ürünlerler Listelendi..", dataSize);
    }


    @Override
    public DataResult<List<ProductListDto>> getProductByColorId(int pageNo, int pageSize, String sortTitle, boolean sort, int colorId) throws BusinessException {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, Sort.by(ifSortConverter(sort), sortTitle));
        this.colorService.checkIfColorGetById(colorId);
        int dataSize = this.productDao.getByColor_ColorId(colorId).size();
        List<Product> response = this.productDao.getByColor_ColorId(pageable, colorId);
        List<ProductListDto> result = response.stream()
                .map(product -> this.modelMapperService.forDto().map(product, ProductListDto.class))
                .collect(Collectors.toList());

        return new SuccessDataResult<>(result, "Ürünlerler Listelendi..", dataSize);
    }

    @Override
    public DataResult<List<ProductListDto>> getProductByBrandId(int pageNo, int pageSize, String sortTitle, boolean sort, int brandId) throws BusinessException {
        this.brandService.checkIfBrandGetById(brandId);
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, Sort.by(ifSortConverter(sort), sortTitle));
        int dataSize = this.productDao.getByBrand_BrandId(brandId).size();
        List<Product> response = this.productDao.getByBrand_BrandId(pageable, brandId);
        List<ProductListDto> result = response.stream()
                .map(product -> this.modelMapperService.forDto().map(product, ProductListDto.class))
                .collect(Collectors.toList());

        return new SuccessDataResult<>(result, "Ürünlerler Listelendi..", dataSize);
    }

    @Override
    public DataResult<List<ProductListDto>> getProductBySizeId(int pageNo, int pageSize, String sortTitle, boolean sort, int sizeId) throws BusinessException {
        this.sizeService.checkIfSizeGetById(sizeId);
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, Sort.by(ifSortConverter(sort), sortTitle));
        int dataSize = this.productDao.getBySize_SizeId(sizeId).size();
        List<Product> response = this.productDao.getBySize_SizeId(pageable, sizeId);
        List<ProductListDto> result = response.stream()
                .map(product -> this.modelMapperService.forDto().map(product, ProductListDto.class))
                .collect(Collectors.toList());

        return new SuccessDataResult<>(result, "Ürünlerler Listelendi..", dataSize);
    }


    @Override
    public DataResult<List<ProductListDto>> getProductByGreaterPrice(double price) throws BusinessException {
        List<Product> response = this.productDao.getByProductDiscountPriceGreaterThanEqual(price);
        List<ProductListDto> result = response.stream()
                .map(product -> this.modelMapperService.forDto().map(product, ProductListDto.class))
                .collect(Collectors.toList());

        return new SuccessDataResult<>(result, "Ürünlerler Listelendi..");
    }

    @Override
    public DataResult<List<ProductListDto>> getProductByLessPrice(double price) throws BusinessException {
        List<Product> response = this.productDao.getByProductDiscountPriceLessThanEqual(price);
        List<ProductListDto> result = response.stream()
                .map(product -> this.modelMapperService.forDto().map(product, ProductListDto.class))
                .collect(Collectors.toList());

        return new SuccessDataResult<>(result, "Ürünlerler Listelendi..");
    }

    @Override
    public DataResult<List<?>> getProductCategoryList() {
        List<CategoryListDto> outputCategory = new ArrayList<>();
        List<CategoryListDto> result = this.categoryService.getAll().getData();
        for (CategoryListDto category : result) {
            if (this.productDao.existsByCategory_CategoryId(category.getCategoryId())) {
                outputCategory.add(category);
            }
        }
        return new SuccessDataResult<>(outputCategory, "Gerekli Kategoriler Listelendi...");
    }

    @Override
    public DataResult<List<ProductListDto>> getProductByCategoryList() {
        Pageable pageable = PageRequest.of(0, 5, Sort.by(ifSortConverter(true), "productTitle"));
        List<ProductListDto> outputProduct = new ArrayList<>();
        List<Product> productList = new ArrayList<>();
        List<CategoryListDto> result = this.categoryService.getAll().getData();
        for (CategoryListDto category : result) {
            if (this.productDao.existsByCategory_CategoryId(category.getCategoryId())) {

                productList.addAll(this.productDao.getByCategory_CategoryId(category.getCategoryId()));
            }
        }

        outputProduct = productList.stream()
                .map(product -> this.modelMapperService.forDto()
                        .map(product, ProductListDto.class)).collect(Collectors.toList());


        return new SuccessDataResult<>(outputProduct, "Kategoriye göre Ürünler Listelendi");
    }

    @Override
    public DataResult<List<?>> getProductBrandList() {
        List<BrandListDto> outputBrand = new ArrayList<>();
        List<BrandListDto> result = this.brandService.getAll().getData();
        for (BrandListDto brand : result) {
            if (this.productDao.existsByBrand_BrandId(brand.getBrandId())) {
                outputBrand.add(brand);
            }
        }
        return new SuccessDataResult<>(outputBrand, "Gerekli Markalar Listelendi...");
    }

    @Override
    public DataResult<List<?>> getProductColorList() {
        List<ColorListDto> outputColor = new ArrayList<>();
        List<ColorListDto> result = this.colorService.getAll().getData();
        for (ColorListDto color : result) {
            if (this.productDao.existsByColor_ColorId(color.getColorId())) {
                outputColor.add(color);
            }
        }
        return new SuccessDataResult<>(outputColor, "Gerekli Renkler Listelendi...");
    }

    @Override
    public DataResult<List<?>> getProductSizeList() {
        List<SizeListDto> outputSize = new ArrayList<>();
        List<SizeListDto> result = this.sizeService.getAll().getData();
        for (SizeListDto size : result) {
            if (this.productDao.existsBySize_SizeId(size.getSizeId())) {
                outputSize.add(size);
            }
        }
        return new SuccessDataResult<>(outputSize, "Gerekli Bedenler Listelendi...");
    }

    public void checkIfProductGetById(int id) throws BusinessException {
        if (!this.productDao.existsById(id)) {
            throw new BusinessException(id + "No'ya Ait Ürünler Bulunamadı..");
        }
    }


    private Sort.Direction ifSortConverter(boolean sort) {
        return sort ? Sort.Direction.ASC : Sort.Direction.DESC;
    }
}
