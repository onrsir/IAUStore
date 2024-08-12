package com.bluefashion.c2cbluefashionbitirmeprojesi.api.controllers;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts.ProductService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.product.ProductGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.product.ProductGetSinglePageDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.product.ProductListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.product.CreateProductRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.product.DeleteProductRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.product.UpdateProductRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/Products")
public class ProductController {
    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/getAll")
    DataResult<List<ProductListDto>> getAll() {
        return this.productService.getAll();
    }

    @GetMapping("getByProductId")
    DataResult<ProductGetDto> getByProductId(@RequestParam int productId) throws BusinessException {
        return this.productService.getByProductId(productId);
    }

    @GetMapping("getSinglePageByProductId")
    DataResult<ProductGetSinglePageDto> getSinglePageByProductId(int productId) throws BusinessException {
        return this.productService.getSinglePageByProductId(productId);
    }


    @PostMapping("/add")
    Result add(@RequestBody @Valid CreateProductRequest createProductRequest) throws BusinessException {
        return this.productService.add(createProductRequest);
    }

    @PutMapping("/update")
    Result update(@RequestBody @Valid UpdateProductRequest updateProductRequest) throws BusinessException {
        return this.productService.update(updateProductRequest);
    }

    @DeleteMapping("/delete")
    Result delete(@RequestBody DeleteProductRequest deleteProductRequest) throws BusinessException {
        return this.productService.delete(deleteProductRequest);
    }

    @GetMapping("/getAllPaged")
    DataResult<List<ProductListDto>> getAllPaged(@RequestParam int pageNo, @RequestParam int pageSize, @RequestParam String sortTitle, @RequestParam boolean sort) {
        return this.productService.getAllPaged(pageNo, pageSize, sortTitle, sort);
    }

    @GetMapping("/getAllSorted")
    DataResult<List<ProductListDto>> getAllSorted(@RequestParam boolean sort) {
        return this.productService.getAllSorted(sort);
    }

    @GetMapping("/getProductByCategoryId")
    DataResult<List<ProductListDto>> getProductByCategoryId(@RequestParam int pageNo, @RequestParam int pageSize, @RequestParam String sortTitle, @RequestParam boolean sort, @RequestParam int categoryId) throws BusinessException {
        return this.productService.getProductByCategoryId(pageNo, pageSize, sortTitle, sort, categoryId);
    }

    @GetMapping("/getProductByUserId")
    DataResult<List<ProductListDto>> getProductByUserId(@RequestParam int pageNo, @RequestParam int pageSize, @RequestParam String sortTitle, @RequestParam boolean sort, @RequestParam int userId) throws BusinessException {
        return this.productService.getProductByUserId(pageNo, pageSize, sortTitle, sort, userId);
    }

    @GetMapping("/getProductByColorId")
    DataResult<List<ProductListDto>> getProductByColorId(@RequestParam int pageNo, @RequestParam int pageSize, @RequestParam String sortTitle, @RequestParam boolean sort, @RequestParam int colorId) throws BusinessException {
        return this.productService.getProductByColorId(pageNo, pageSize, sortTitle, sort, colorId);
    }

    @GetMapping("/getProductByBrandId")
    DataResult<List<ProductListDto>> getProductByBrandId(@RequestParam int pageNo, @RequestParam int pageSize, @RequestParam String sortTitle, @RequestParam boolean sort, @RequestParam int brandId) throws BusinessException {
        return this.productService.getProductByBrandId(pageNo, pageSize, sortTitle, sort, brandId);
    }

    @GetMapping("/getProductBySizeId")
    DataResult<List<ProductListDto>> getProductBySizeId(@RequestParam int pageNo, @RequestParam int pageSize, @RequestParam String sortTitle, @RequestParam boolean sort, @RequestParam int sizeId) throws BusinessException {
        return this.productService.getProductBySizeId(pageNo, pageSize, sortTitle, sort, sizeId);
    }

    @GetMapping("/getProductByGreaterPrice")
    DataResult<List<ProductListDto>> getProductByGreaterPrice(@RequestParam double price) throws BusinessException {
        return this.productService.getProductByGreaterPrice(price);
    }

    @GetMapping("/getProductByLessPrice")
    DataResult<List<ProductListDto>> getProductByLessPrice(@RequestParam double price) throws BusinessException {
        return this.productService.getProductByLessPrice(price);
    }

    @GetMapping("/getProductByCategoryList")
    DataResult<List<ProductListDto>> getProductByCategoryList() {
        return this.productService.getProductByCategoryList();
    }

    @GetMapping("/getProductCategoryList")
    DataResult<List<?>> getProductCategoryList() {
        return this.productService.getProductCategoryList();
    }

    @GetMapping("/getProductBrandList")
    DataResult<List<?>> getProductBrandList() {
        return this.productService.getProductBrandList();
    }

    @GetMapping("/getProductColorList")
    DataResult<List<?>> getProductColorList() {
        return this.productService.getProductColorList();
    }

    @GetMapping("/getProductSizeList")
    DataResult<List<?>> getProductSizeList() {
        return this.productService.getProductSizeList();
    }


}
