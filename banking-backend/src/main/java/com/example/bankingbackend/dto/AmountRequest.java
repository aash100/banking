package com.example.bankingbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AmountRequest {
//    private String accountNumber;
    private String pin;
    private double amount;
}
