package com.bluefashion.c2cbluefashionbitirmeprojesi.entities.concrates;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private int imageId;
    @Column(name = "image_subinfo")
    private String imageSubInfo;
    @Column(name = "image_Url")
    private String imageUrl;

    @OneToMany(mappedBy = "coverImage")
    private List<User> coverUsers;

    @OneToMany(mappedBy = "profileImage")
    private List<User> profileUsers;

    @OneToMany(mappedBy = "productImage", cascade = CascadeType.ALL)
    private List<Product> products;

}
