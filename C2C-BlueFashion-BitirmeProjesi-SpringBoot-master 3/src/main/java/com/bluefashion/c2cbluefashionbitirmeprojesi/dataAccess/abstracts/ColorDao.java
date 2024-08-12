package com.bluefashion.c2cbluefashionbitirmeprojesi.dataAccess.abstracts;

import com.bluefashion.c2cbluefashionbitirmeprojesi.entities.concrates.Color;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColorDao extends JpaRepository<Color, Integer> {
    boolean existsByColorName(String colorName);
}
