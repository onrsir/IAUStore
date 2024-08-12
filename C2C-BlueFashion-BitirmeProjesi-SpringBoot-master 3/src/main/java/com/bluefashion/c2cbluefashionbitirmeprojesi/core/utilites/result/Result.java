package com.bluefashion.c2cbluefashionbitirmeprojesi.core.utilites.result;

public class Result {
    private boolean success;
    private String message;
    private int Id;


    public Result(boolean success) {
        this.success = success;
    }

    public Result(boolean success, String message) {
        this(success);
        this.message = message;
    }

    public Result(boolean success, String message, int id) {
        this(success);
        this.message = message;
        this.Id = id;
    }

    public boolean isSuccess() {
        return this.success;
    }

    public String getMessage() {
        return this.message;
    }

    public int getId() {
        return this.Id;
    }
}
