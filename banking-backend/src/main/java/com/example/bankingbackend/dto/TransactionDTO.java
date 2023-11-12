package com.example.bankingbackend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TransactionDTO {
    private Long id; 
    private double amount;
    private String transactionType;
    private Date transactionDate;
    private String sourceAccountNumber;
    private String targetAccountNumber;
}