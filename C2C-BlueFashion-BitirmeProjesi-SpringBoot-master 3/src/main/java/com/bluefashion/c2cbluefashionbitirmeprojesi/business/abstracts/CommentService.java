package com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.comment.CommentGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.comment.CommentListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.comment.CreateCommentRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.comment.DeleteCommentRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.comment.UpdateCommentRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;

import java.util.List;

public interface CommentService {
    DataResult<List<CommentListDto>> getAll();

    DataResult<CommentGetDto> getByCommentId(int commentId) throws BusinessException;

    DataResult<List<CommentListDto>> getCommentByProductId(int productId) throws BusinessException;

    Result add(CreateCommentRequest createCommentRequest) throws BusinessException;

    Result update(UpdateCommentRequest updateCommentRequest) throws BusinessException;

    Result delete(DeleteCommentRequest deleteCommentRequest) throws BusinessException;

    DataResult<List<CommentListDto>> getAllPaged(int pageNo, int pageSize);

    DataResult<List<CommentListDto>> getAllSorted(boolean sort);

    void checkIfCommentGetById(int id) throws BusinessException;

}
