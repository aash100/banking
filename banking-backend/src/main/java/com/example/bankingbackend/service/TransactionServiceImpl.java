package com.example.bankingbackend.service;

import com.example.bankingbackend.dto.TransactionDTO;
import com.example.bankingbackend.entity.Transaction;
import com.example.bankingbackend.mapper.TransactionMapper;
import com.example.bankingbackend.repository.TransactionRepository;
import com.example.bankingbackend.repository.UserRepository;
import com.example.bankingbackend.security.JwtAuthenticationFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl implements TransactionService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private TransactionRepository transactionRepository;

	 @Autowired
	    private TransactionMapper transactionMapper;

	private Logger logger = LoggerFactory.getLogger(TransactionServiceImpl.class);
	 @Override
	 public List<TransactionDTO> getAllTransactionsByAccountNumber(String value) {
		 String accountNumber= userRepository.findByEmail(value).getAccount().getAccountNumber();
	     List<Transaction> transactions = transactionRepository.findBySourceAccount_AccountNumberOrTargetAccount_AccountNumber(accountNumber, accountNumber);
	     
	     List<TransactionDTO> transactionDTOs = transactions.stream()
	             .map(transactionMapper::toDto)
	             .sorted(Comparator.comparing(TransactionDTO::getTransactionDate).reversed())
	             .collect(Collectors.toList());

	     return transactionDTOs;
	 }


}
