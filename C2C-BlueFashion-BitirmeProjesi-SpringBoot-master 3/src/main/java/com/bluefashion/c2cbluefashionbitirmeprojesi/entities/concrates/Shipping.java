package com.bluefashion.c2cbluefashionbitirmeprojesi.entities.concrates;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Shippings")
public class Shipping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shipping_id")
    private int shippingId;
    @Column(name = "shipping_company")
    private String shippingCompany;
    @Column(name = "shipping_payment_method")
    private String shippingPaymentMethod;
    @Column(name = "shipping_price")
    private String shippingPrice;
    @Column(name = "shipping_date")
    private String shippingDate;
    @Column(name = "shipping_tracking_number")
    private String shippingTrackingNumber;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;


}
