package com.example.bankingbackend.controller;

import com.example.bankingbackend.dto.AccountResponse;
import com.example.bankingbackend.dto.UserResponse;
import com.example.bankingbackend.service.DashboardService;
import com.example.bankingbackend.util.LoggedinUser;
import com.example.bankingbackend.wrapper.CommonResponseWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;
    private Logger logger = LoggerFactory.getLogger(DashboardController.class);
    @GetMapping("/user")
    public ResponseEntity<CommonResponseWrapper<UserResponse>> getUserDetails() {
        String accountNumber = LoggedinUser.getAccountNumber();
        UserResponse userResponse = dashboardService.getUserDetails(accountNumber);
        return new ResponseEntity<>(new CommonResponseWrapper<UserResponse>(userResponse,"User details fetched successfully",null ), HttpStatus.OK);
//        return ResponseEntity.ok(userResponse);
    }

    @GetMapping("/account")
    public ResponseEntity<CommonResponseWrapper<AccountResponse>> getAccountDetails() {
        String accountNumber = LoggedinUser.getAccountNumber();
        AccountResponse accountResponse = dashboardService.getAccountDetails(accountNumber);
        return new ResponseEntity<>(new CommonResponseWrapper<AccountResponse>(accountResponse,"Account details fetched successfully",null ), HttpStatus.OK);

//        return ResponseEntity.ok(accountResponse);
    }
    
    
   
}