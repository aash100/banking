package com.example.bankingbackend.controller;


import com.example.bankingbackend.dto.AmountRequest;
import com.example.bankingbackend.dto.FundTransferRequest;
import com.example.bankingbackend.dto.TransactionDTO;
import com.example.bankingbackend.service.AccountService;
import com.example.bankingbackend.service.TransactionService;
import com.example.bankingbackend.util.LoggedinUser;
import com.example.bankingbackend.wrapper.CommonResponseMapper;
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


     

//    @GetMapping("/pin/check")
//    public ResponseEntity<?> checkAccountPIN() {
//        boolean isPINValid = accountService.isPinCreated(LoggedinUser.getAccountNumber());
//
//
//        Map<String, Object> result =  new HashMap<>();
//        result.put("hasPIN",isPINValid );
//
//        if (isPINValid) {
//        	result.put("msg", "PIN Created");
//
//        } else {
//        	result.put("msg", "Pin Not Created");
//        }
//
//        return new ResponseEntity<>( result, HttpStatus.OK);
//    }

//    @PostMapping("/pin/create")
//    public ResponseEntity<?> createPIN(@RequestBody PinRequest pinRequest) {
//        accountService.createPIN(LoggedinUser.getAccountNumber(), pinRequest.getPassword(), pinRequest.getPin());
//
//        Map<String, String> response =  new HashMap<>();
//        response.put("msg", "PIN created successfully");
//
//        return new ResponseEntity<>( response, HttpStatus.OK);
//
//
//    }

//    @PostMapping("/pin/update")
//    public ResponseEntity<?> updatePIN(@RequestBody PinUpdateRequest pinUpdateRequest) {
//        accountService.updatePIN(LoggedinUser.getAccountNumber(), pinUpdateRequest.getOldPin(), pinUpdateRequest.getPassword(), pinUpdateRequest.getNewPin());
//
//        Map<String, String> response =  new HashMap<>();
//        response.put("msg", "PIN updated successfully");
//
//        return new ResponseEntity<>( response, HttpStatus.OK);
//
//     }

    @PostMapping("/deposit")
    public ResponseEntity<CommonResponseMapper<String>> cashDeposit(@RequestBody AmountRequest amountRequest) {
        accountService.cashDeposit(LoggedinUser.getAccountNumber(), amountRequest.getPin(), amountRequest.getAmount());
        
        Map<String, String> response =  new HashMap<>();
        response.put("msg", "Cash deposited successfully");
        
        return new ResponseEntity<>( new CommonResponseMapper<String>("","Cash deposited successfully",null ), HttpStatus.OK);
        
     }

    @PostMapping("/withdraw")
    public ResponseEntity<CommonResponseMapper<String>> cashWithdrawal(@RequestBody AmountRequest amountRequest) {
        accountService.cashWithdrawal(LoggedinUser.getAccountNumber(), amountRequest.getPin(), amountRequest.getAmount());
        
        Map<String, String> response =  new HashMap<>();
        response.put("msg", "Cash withdrawn successfully");
        
        return new ResponseEntity<>( new CommonResponseMapper<String>("","Cash withdrawn successfully",null ), HttpStatus.OK);
    }

    @PostMapping("/fund-transfer")
    public ResponseEntity<CommonResponseMapper<String>> fundTransfer(@RequestBody FundTransferRequest fundTransferRequest) {
        accountService.fundTransfer(LoggedinUser.getAccountNumber(), fundTransferRequest.getTargetAccountNumber(), fundTransferRequest.getPin(), fundTransferRequest.getAmount());
       Map<String, String> response =  new HashMap<>();
        response.put("msg", "Fund transferred successfully");
        
        return new ResponseEntity<>( new CommonResponseMapper<String>("","Fund transferred successfully",null ), HttpStatus.OK);
    }
    
    
    @GetMapping("/transactions")
    public ResponseEntity<CommonResponseMapper<List<TransactionDTO>>> getAllTransactionsByAccountNumber() {
        List<TransactionDTO> transactions = transactionService.getAllTransactionsByAccountNumber(LoggedinUser.getAccountNumber());
//        CommonResponseMapper<List<TransactionDTO>> tr= new CommonResponseMapper<List<TransactionDTO>>(transactions,"Transactions fetched successfully",null );
//        return ResponseEntity.ok(transactions);
        return new ResponseEntity<>( new CommonResponseMapper<List<TransactionDTO>>(transactions,"Fund transferred successfully",null ), HttpStatus.OK);

    }
}
