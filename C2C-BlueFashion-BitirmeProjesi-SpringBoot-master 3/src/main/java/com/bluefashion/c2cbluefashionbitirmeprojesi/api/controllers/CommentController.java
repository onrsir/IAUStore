package com.bluefashion.c2cbluefashionbitirmeprojesi.api.controllers;

import com.bluefashion.c2cbluefashionbitirmeprojesi.business.abstracts.CommentService;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.comment.CommentGetDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.comment.CommentListDto;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.comment.CreateCommentRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.comment.DeleteCommentRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.comment.UpdateCommentRequest;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.exception.BusinessException;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.DataResult;
import com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/Comments")
public class CommentController {
    private CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/getAll")
    DataResult<List<CommentListDto>> getAll() {
        return this.commentService.getAll();
    }

    @GetMapping("getByCommentId")
    DataResult<CommentGetDto> getByCommentId(@RequestParam int commentId) throws BusinessException {
        return this.commentService.getByCommentId(commentId);
    }

    @PostMapping("/add")
    Result add(@RequestBody @Valid CreateCommentRequest createCommentRequest) throws BusinessException {
        return this.commentService.add(createCommentRequest);
    }

    @PutMapping("/update")
    Result update(@RequestBody @Valid UpdateCommentRequest updateCommentRequest) throws BusinessException {
        return this.commentService.update(updateCommentRequest);
    }

    @DeleteMapping("/delete")
    Result delete(@RequestBody DeleteCommentRequest deleteCommentRequest) throws BusinessException {
        return this.commentService.delete(deleteCommentRequest);
    }

    @GetMapping("/getAllPaged")
    DataResult<List<CommentListDto>> getAllPaged(@RequestParam int pageNo, @RequestParam int pageSize) {
        return this.commentService.getAllPaged(pageNo, pageSize);
    }

    @GetMapping("/getAllSorted")
    DataResult<List<CommentListDto>> getAllSorted(@RequestParam boolean sort) {
        return this.commentService.getAllSorted(sort);
    }

    @GetMapping("/getCommentByProductId")
    DataResult<List<CommentListDto>> getCommentByProductId(@RequestParam int productId) throws BusinessException {
        return this.commentService.getCommentByProductId(productId);
    }
}
