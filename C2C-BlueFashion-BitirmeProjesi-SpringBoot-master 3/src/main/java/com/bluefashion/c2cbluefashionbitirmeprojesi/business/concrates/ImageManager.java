package com.bluefashion.c2cbluefashionbitirmeprojesi.business.concrates;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts.ImageService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.image.ImageGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.image.ImageListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.image.CreateImageRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.image.DeleteImageRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.image.UpdateImageRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.mapping.ModelMapperService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.SuccessDataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.SucessResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.dataAccess.abstracts.ImageDao;
import com.bluefashion.c2cbluefashionbitirmeprojesi.entities.concrates.Image;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImageManager implements ImageService {
    private ImageDao imageDao;
    private ModelMapperService modelMapperService;

    @Autowired
    public ImageManager(ImageDao imageDao, ModelMapperService modelMapperService) {
        this.imageDao = imageDao;
        this.modelMapperService = modelMapperService;
    }

    @Override
    public DataResult<List<ImageListDto>> getAll() {
        List<Image> response = this.imageDao.findAll();
        List<ImageListDto> result = response.stream()
                .map(image -> this.modelMapperService.forDto().map(image, ImageListDto.class))
                .collect(Collectors.toList());

        return new SuccessDataResult<>(result, "Resimler Listelendi..");
    }

    @Override
    public DataResult<ImageGetDto> getByImageId(int imageId) throws BusinessException {
        checkIfImageGetById(imageId);
        Image response = this.imageDao.getById(imageId);
        ImageGetDto result = this.modelMapperService.forDto().map(response, ImageGetDto.class);
        return new SuccessDataResult<>(result, imageId + " No'ya Ait Renk Getirildi..");
    }

    @Value("${file.upload-dir}")
    String FILE_DIRECTORY;

    @Override
    public Result add(CreateImageRequest createImageRequest) throws IOException {
        String ext = "jpg";
        String name = String.format("%s.%s", RandomStringUtils.randomAlphanumeric(8), ext);
        File myFile = new File(FILE_DIRECTORY + name);
        myFile.createNewFile();
        FileOutputStream fos = new FileOutputStream(myFile);
        fos.write(createImageRequest.getFile().getBytes());
        fos.close();

        Image result = this.modelMapperService.forRequest().map(createImageRequest, Image.class);
        result.setImageUrl("asset/img/images/" + name);
        Image imagess = this.imageDao.save(result);
        return new SucessResult(" Başarıyla Eklendi..", imagess.getImageId());
    }

    @Override
    public Result update(UpdateImageRequest updateImageRequest) throws BusinessException, IOException {
        checkIfImageGetById(updateImageRequest.getImageId());
        String ext = "jpg";
        String name = String.format("%s.%s", RandomStringUtils.randomAlphanumeric(8), ext);
        File myFile = new File(FILE_DIRECTORY + name);
        myFile.createNewFile();
        FileOutputStream fos = new FileOutputStream(myFile);
        fos.write(updateImageRequest.getFile().getBytes());
        fos.close();

        Image result = this.modelMapperService.forRequest().map(updateImageRequest, Image.class);
        result.setImageUrl("asset/img/images/" + name);
        this.imageDao.save(result);
        return new SucessResult(" Başarıyla Güncellendi..");

    }

    @Override
    public Result delete(DeleteImageRequest deleteImageRequest) throws BusinessException {
        checkIfImageGetById(deleteImageRequest.getImageId());
        Image result = this.imageDao.getById(deleteImageRequest.getImageId());
        this.imageDao.delete(result);
        return new SucessResult(" Başarıyla Silindi..");
    }

    @Override
    public DataResult<List<ImageListDto>> getAllPaged(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        List<Image> response = this.imageDao.findAll(pageable).getContent();
        List<ImageListDto> result = response.stream()
                .map(image -> this.modelMapperService.forDto().map(image, ImageListDto.class))
                .collect(Collectors.toList());
        return new SuccessDataResult<>(result, "Resimler Listelendi..");
    }

    @Override
    public DataResult<List<ImageListDto>> getAllSorted(boolean sort) {
        Sort imageSort = Sort.by(ifSortConverter(sort), "ImageId");
        List<Image> response = this.imageDao.findAll(imageSort);
        List<ImageListDto> result = response.stream()
                .map(image -> this.modelMapperService.forDto().map(image, ImageListDto.class))
                .collect(Collectors.toList());
        return new SuccessDataResult<>(result, "Resimler Listelendi..");
    }

    public void checkIfImageGetById(int id) throws BusinessException {

        if (!this.imageDao.existsById(id)) {
            throw new BusinessException("No'ya Ait Görsel Bulunamadı..");
        }
    }

    private Sort.Direction ifSortConverter(boolean sort) {
        return sort ? Sort.Direction.ASC : Sort.Direction.DESC;
    }


}
