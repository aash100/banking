package com.example.bankingbackend.wrapper;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class CommonResponseWrapper<T> {
    private T data;
    private String successMsg;
    private String errorMsg;
}
