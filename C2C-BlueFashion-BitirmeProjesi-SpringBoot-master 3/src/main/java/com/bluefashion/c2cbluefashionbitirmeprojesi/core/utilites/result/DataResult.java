package com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result;

public class DataResult<T> extends Result {
    private T data;
    private int dataSize;


    public DataResult(T data, boolean success) {
        super(success);
        this.data = data;
    }


    public DataResult(T data, boolean success, String message) {
        super(success, message);
        this.data = data;
    }

    public DataResult(T data, boolean success, String message, int pageSize) {
        super(success, message);
        this.data = data;
        this.dataSize = pageSize;
    }

    public T getData() {
        return this.data;
    }

    public int getDataSize() {
        return this.dataSize;
    }
}
