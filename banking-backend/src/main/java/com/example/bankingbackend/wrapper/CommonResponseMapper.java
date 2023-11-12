package com.example.bankingbackend.wrapper;

import com.example.bankingbackend.dto.ErrorResponse;
import com.example.bankingbackend.dto.SuccessResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class CommonResponseMapper<T> {
    private T data;
    private String successMsg;
    private String errorMsg;
}
