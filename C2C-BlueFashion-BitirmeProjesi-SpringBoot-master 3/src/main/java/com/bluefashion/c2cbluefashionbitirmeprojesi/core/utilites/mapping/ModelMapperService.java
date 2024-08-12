package com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.mapping;

import org.modelmapper.ModelMapper;

public interface ModelMapperService {
    ModelMapper forDto();

    ModelMapper forRequest();
}
