package com.bluefashion.c2cbluefashionbitirmeprojesi.business.concrates;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts.CommentService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts.ProductService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.comment.CommentGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.comment.CommentListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.comment.CreateCommentRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.comment.DeleteCommentRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.comment.UpdateCommentRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.mapping.ModelMapperService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.SuccessDataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.SucessResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.dataAccess.abstracts.CommentDao;
import com.bluefashion.c2cbluefashionbitirmeprojesi.entities.concrates.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentManager implements CommentService {
    private CommentDao commentDao;
    private ModelMapperService modelMapperService;
    private ProductService productService;

    @Autowired
    public CommentManager(CommentDao commentDao, ModelMapperService modelMapperService, ProductService productService) {
        this.commentDao = commentDao;
        this.modelMapperService = modelMapperService;
        this.productService = productService;
    }

    @Override
    public DataResult<List<CommentListDto>> getAll() {
        List<Comment> response = this.commentDao.findAll();
        List<CommentListDto> result = response.stream()
                .map(comment -> this.modelMapperService.forDto().map(comment, CommentListDto.class))
                .collect(Collectors.toList());

        return new SuccessDataResult<>(result, "Yorumlar Listelendi..");
    }

    @Override
    public DataResult<CommentGetDto> getByCommentId(int commentId) throws BusinessException {
        checkIfCommentGetById(commentId);
        Comment response = this.commentDao.getById(commentId);
        CommentGetDto result = this.modelMapperService.forDto().map(response, CommentGetDto.class);
        return new SuccessDataResult<>(result, commentId + " No'ya Ait Yorumlaetirildi..");
    }

    @Override
    public DataResult<List<CommentListDto>> getCommentByProductId(int productId) throws BusinessException {
        this.productService.checkIfProductGetById(productId);

        List<Comment> response = this.commentDao.getByProduct_ProductId(productId);
        List<CommentListDto> result = response.stream()
                .map(comment -> this.modelMapperService.forDto().map(comment, CommentListDto.class))
                .collect(Collectors.toList());

        return new SuccessDataResult<>(result, "Yorumlar Listelendi..");
    }

    @Override
    public Result add(CreateCommentRequest createCommentRequest) throws BusinessException {
        Comment result = this.modelMapperService.forRequest().map(createCommentRequest, Comment.class);
        //parent_CommentId 0 ise, id kontrolu yapma çünkü id 0 ise parent değeri yoktur
        if (createCommentRequest.getParent_CommentId() != 0) {
            checkIfCommentGetById(createCommentRequest.getParent_CommentId());
            //Model Mapper Sınıfında bir karışıklık oluyor isimler yüzünden onu önlemek için manuel olarak ekleme yapılıyor
            result.setParent(this.commentDao.getById(createCommentRequest.getParent_CommentId()));
        }
        result.setCommentId(0);
        this.commentDao.save(result);
        return new SucessResult("Başarıyla Eklendi..");
    }

    @Override
    public Result update(UpdateCommentRequest updateCommentRequest) throws BusinessException {
        Comment result = this.modelMapperService.forRequest().map(updateCommentRequest, Comment.class);
        //parent_CommentId 0 ise, id kontrolu yapma çünkü id 0 ise parent değeri yoktur
        if (updateCommentRequest.getParent_CommentId() != 0) {
            checkIfCommentGetById(updateCommentRequest.getParent_CommentId());
            //Model Mapper Sınıfında bir karışıklık oluyor isimler yüzünden onu önlemek için manuel olarak ekleme yapılıyor
            result.setParent(this.commentDao.getById(updateCommentRequest.getParent_CommentId()));
        }
        this.commentDao.save(result);
        return new SucessResult("Başarıyla Güncellendi..");

    }

    @Override
    public Result delete(DeleteCommentRequest deleteCommentRequest) throws BusinessException {
        checkIfCommentGetById(deleteCommentRequest.getCommentId());
        Comment result = this.commentDao.getById(deleteCommentRequest.getCommentId());
        this.commentDao.delete(result);
        return new SucessResult(" Başarıyla Silindi..");
    }

    @Override
    public DataResult<List<CommentListDto>> getAllPaged(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        List<Comment> response = this.commentDao.findAll(pageable).getContent();
        List<CommentListDto> result = response.stream()
                .map(comment -> this.modelMapperService.forDto().map(comment, CommentListDto.class))
                .collect(Collectors.toList());
        return new SuccessDataResult<>(result, "Yorumlar Listelendi..");
    }

    @Override
    public DataResult<List<CommentListDto>> getAllSorted(boolean sort) {
        Sort commentSort = Sort.by(ifSortConverter(sort), "CommentName");
        List<Comment> response = this.commentDao.findAll(commentSort);
        List<CommentListDto> result = response.stream()
                .map(comment -> this.modelMapperService.forDto().map(comment, CommentListDto.class))
                .collect(Collectors.toList());
        return new SuccessDataResult<>(result, "Yorumlar Listelendi..");
    }

    public void checkIfCommentGetById(int id) throws BusinessException {
        if (!this.commentDao.existsById(id)) {
            throw new BusinessException(id + " No'ya Ait Yorum Bulunamadı..");
        }
    }


    private Sort.Direction ifSortConverter(boolean sort) {
        return sort ? Sort.Direction.ASC : Sort.Direction.DESC;
    }
}
