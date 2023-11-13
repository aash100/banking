package com.example.bankingbackend.controller;

import com.example.bankingbackend.dto.AccountResponse;
import com.example.bankingbackend.dto.UserResponse;
import com.example.bankingbackend.security.JwtAuthenticationFilter;
import com.example.bankingbackend.service.DashboardService;
import com.example.bankingbackend.util.LoggedinUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;
    private Logger logger = LoggerFactory.getLogger(DashboardController.class);
    @GetMapping("/user")
    public ResponseEntity<UserResponse> getUserDetails() {
        String accountNumber = LoggedinUser.getAccountNumber();
        UserResponse userResponse = dashboardService.getUserDetails(accountNumber);
        return ResponseEntity.ok(userResponse);
    }

    @GetMapping("/account")
    public ResponseEntity<AccountResponse> getAccountDetails() {
        String accountNumber = LoggedinUser.getAccountNumber();
        AccountResponse accountResponse = dashboardService.getAccountDetails(accountNumber);
        return ResponseEntity.ok(accountResponse);
    }
    
    
   
}