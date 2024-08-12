package com.bluefashion.c2cbluefashionbitirmeprojesi.business.dtos.comment;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentListDto {

    private int commentId;
    private String commentTitle;
    private String commentContent;
    private Date commentCreateDate;
    private int commentScore;
    private String parent_commentTitle;

    private String userName;
    private String profileImageImageUrl;
    private String productTitle;


}
