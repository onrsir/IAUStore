package com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result;

public class SuccessDataResult<T> extends DataResult<T> {
    public SuccessDataResult(T data, String message) {
        super(data, true, message);
    }

    public SuccessDataResult(T data, String message, int dataSize) {
        super(data, true, message, dataSize);
    }

    public SuccessDataResult(T data) {
        super(data, true);
    }

    public SuccessDataResult(T data, boolean success, String message) {
        super(data, true, message);
    }

    public SuccessDataResult() {
        super(null, true);
    }


}
