package com.example.bankingbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FundTransferRequest {
    private String targetAccountNumber;
    private double amount;
    private String pin;
}
