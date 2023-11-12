package com.example.bankingbackend.service;


import com.example.bankingbackend.dto.AccountResponse;
import com.example.bankingbackend.dto.UserResponse;
import com.example.bankingbackend.entity.Account;
import com.example.bankingbackend.entity.User;
import com.example.bankingbackend.exception.NotFoundException;
import com.example.bankingbackend.repository.AccountRepository;
import com.example.bankingbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public UserResponse getUserDetails(String accountNumber) {
        User user = userRepository.findByEmail(accountNumber);
        // Check if the user exists and is associated with the given account number
        if (user == null) {
            throw new NotFoundException("User not found for the provided account number.");
        }

        // Map the user entity to UserResponse DTO
        UserResponse userResponse = new UserResponse();
        userResponse.setName(user.getName());
        userResponse.setEmail(user.getEmail());
        userResponse.setAddress(user.getAddress());
        userResponse.setContactNo(user.getContactNo());
        userResponse.setAccountNumber(user.getAccount().getAccountNumber());

        return userResponse;
    }

    @Override
    public AccountResponse getAccountDetails(String accountNumber) {
        User user = userRepository.findByEmail(accountNumber);

        Account account = accountRepository.findByAccountNumber(user.getAccount().getAccountNumber());
        // Check if the account exists with the provided account number
        if (account == null) {
            throw new NotFoundException("Account not found for the provided account number.");
        }

        // Map the account entity to AccountResponse DTO
        AccountResponse accountResponse = new AccountResponse();
        accountResponse.setAccountNumber(account.getAccountNumber());
        accountResponse.setBalance(account.getBalance());
        return accountResponse;
    }
}