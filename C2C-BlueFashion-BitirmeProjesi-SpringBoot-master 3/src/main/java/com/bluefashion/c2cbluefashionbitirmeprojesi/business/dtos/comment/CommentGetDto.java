package com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.comment;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentGetDto {

    private int commentId;
    private String commentTitle;
    private String commentContent;
    private Date commentCreateDate;
    private int commentScore;
    private int parentId;

    private int userId;
    private int productId;

}
