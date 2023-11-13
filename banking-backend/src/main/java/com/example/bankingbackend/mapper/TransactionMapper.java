package com.example.bankingbackend.mapper;

import com.example.bankingbackend.dto.TransactionDTO;
import com.example.bankingbackend.entity.Transaction;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;

@Component
public class TransactionMapper {

    public TransactionDTO toDto(Transaction transaction) {
        TransactionDTO dto = new TransactionDTO();
        dto.setId(transaction.getId());
        dto.setAmount(transaction.getAmount());
        dto.setTransactionType(transaction.getTransaction_type());
        dto.setTransactionDate(new SimpleDateFormat("dd-MMM-YYYY hh:mm:ss").format(transaction.getTransaction_date()));
        dto.setSourceAccountNumber(transaction.getSourceAccount().getAccountNumber());
        if (transaction.getTargetAccount() != null) {
            dto.setTargetAccountNumber(transaction.getTargetAccount().getAccountNumber());
        } else {
            // Handle the case where target account is null (e.g., set a default value or do nothing)
            dto.setTargetAccountNumber("N/A"); // Replace "N/A" with an appropriate default value
        }
        return dto;
    }
}
