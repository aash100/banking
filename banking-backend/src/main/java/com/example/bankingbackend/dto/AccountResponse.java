package com.example.bankingbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountResponse {
    private String accountNumber;
    private double balance;
    private String accountType;
    private String branch;
    private String IFSCCode;
}
