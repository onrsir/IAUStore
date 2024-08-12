package com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result;

public class ErrorResult extends Result {
    public ErrorResult() {
        super(false);
    }

    public ErrorResult( String message) {
        super(false, message);
    }
}
