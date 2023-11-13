package com.example.bankingbackend.controller;


import com.example.bankingbackend.dto.AmountRequest;
import com.example.bankingbackend.dto.FundTransferRequest;
import com.example.bankingbackend.dto.TransactionDTO;
import com.example.bankingbackend.security.JwtAuthenticationFilter;
import com.example.bankingbackend.service.AccountService;
import com.example.bankingbackend.service.TransactionService;
import com.example.bankingbackend.util.LoggedinUser;
import com.example.bankingbackend.wrapper.CommonResponseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/account")
public class AccountController {

    @Autowired
    private AccountService accountService;
    
    @Autowired
    private TransactionService transactionService;

    private Logger logger = LoggerFactory.getLogger(AccountController.class);
    @PostMapping("/deposit")
    public ResponseEntity<CommonResponseMapper<String>> cashDeposit(@RequestBody AmountRequest amountRequest) {
        accountService.cashDeposit(LoggedinUser.getAccountNumber(), amountRequest.getPin(), amountRequest.getAmount());
        return new ResponseEntity<>( new CommonResponseMapper<String>("","Amount deposited successfully",null ), HttpStatus.OK);
     }

    @PostMapping("/withdraw")
    public ResponseEntity<CommonResponseMapper<String>> cashWithdrawal(@RequestBody AmountRequest amountRequest) {
        accountService.cashWithdrawal(LoggedinUser.getAccountNumber(), amountRequest.getPin(), amountRequest.getAmount());
        return new ResponseEntity<>( new CommonResponseMapper<String>("","Amount withdrawn successfully",null ), HttpStatus.OK);
    }

    @PostMapping("/fund-transfer")
    public ResponseEntity<CommonResponseMapper<String>> fundTransfer(@RequestBody FundTransferRequest fundTransferRequest) {
        accountService.fundTransfer(LoggedinUser.getAccountNumber(), fundTransferRequest.getTargetAccountNumber(), fundTransferRequest.getPin(), fundTransferRequest.getAmount());
        return new ResponseEntity<>( new CommonResponseMapper<String>("","Fund transferred successfully",null ), HttpStatus.OK);
    }
    
    
    @GetMapping("/transactions")
    public ResponseEntity<CommonResponseMapper<List<TransactionDTO>>> getAllTransactionsByAccountNumber() {
        List<TransactionDTO> transactions = transactionService.getAllTransactionsByAccountNumber(LoggedinUser.getAccountNumber());
        return new ResponseEntity<>( new CommonResponseMapper<List<TransactionDTO>>(transactions,"Fund transferred successfully",null ), HttpStatus.OK);
    }
}
