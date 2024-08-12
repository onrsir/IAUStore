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
@Table(name = "addresses")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private int addressId;
    @Column(name = "address_title")
    private String addressTitle;
    @Column(name = "address_first_name")
    private String addressFirstName;
    @Column(name = "address_last_name")
    private String addressLastName;
    @Column(name = "address_mail")
    private String addressMail;
    @Column(name = "address_phone_number")
    private String addressPhoneNumber;
    @Column(name = "address_province")
    private String addressProvince;
    @Column(name = "address_county")
    private String addressCounty;
    @Column(name = "address_district")
    private String addressDistrict;
    @Column(name = "address_post_code")
    private String addressPostCode;
    @Column(name = "address_full_address")
    private String addressFullAdress;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "address")
    private List<Shipping> shippings;


}
