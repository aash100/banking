package com.example.bankingbackend.service;


import com.example.bankingbackend.dto.AccountResponse;
import com.example.bankingbackend.dto.UserResponse;

public interface DashboardService {
    UserResponse getUserDetails(String accountNumber);
    AccountResponse getAccountDetails(String accountNumber);
}