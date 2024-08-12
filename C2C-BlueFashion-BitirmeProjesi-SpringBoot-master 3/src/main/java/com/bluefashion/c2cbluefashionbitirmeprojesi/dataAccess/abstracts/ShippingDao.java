package com.bluefashion.c2cbluefashionbitirmeprojesi.dataAccess.abstracts;

import com.bluefashion.c2cbluefashionbitirmeprojesi.entities.concrates.Shipping;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShippingDao extends JpaRepository<Shipping, Integer> {
}
