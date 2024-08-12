package com.bluefashion.c2cbluefashionbitirmeprojesi.business.request.comment;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateCommentRequest {

    @NotNull
    private String commentTitle;
    @NotNull
    private String commentContent;
    @NotNull
    private Date commentCreateDate;
    @Min(1)
    @Max(10)
    @NotNull
    private int commentScore;
    private int parent_CommentId;

    private int userId;
    private int ProductId;


}
