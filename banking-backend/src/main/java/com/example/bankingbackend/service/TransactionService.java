package com.example.bankingbackend.service;


import com.example.bankingbackend.dto.TransactionDTO;

import java.util.List;

public interface TransactionService {

	List<TransactionDTO> getAllTransactionsByAccountNumber(String accountNumber);

}
