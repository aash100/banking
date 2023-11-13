package com.example.bankingbackend.service;

import com.example.bankingbackend.entity.Account;
import com.example.bankingbackend.entity.Transaction;
import com.example.bankingbackend.entity.User;
import com.example.bankingbackend.exception.InsufficientBalanceException;
import com.example.bankingbackend.exception.NotFoundException;
import com.example.bankingbackend.exception.UnauthorizedException;
import com.example.bankingbackend.repository.AccountRepository;
import com.example.bankingbackend.repository.TransactionRepository;
import com.example.bankingbackend.repository.UserRepository;
import com.example.bankingbackend.security.JwtAuthenticationFilter;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Random;
import java.util.UUID;

@Service
public class AccountServiceImpl implements AccountService {

	@Autowired
    private AccountRepository accountRepository;
	
	@Autowired
    private TransactionRepository transactionRepository;
	
	@Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    private Logger logger = LoggerFactory.getLogger(AccountServiceImpl.class);
	@Override
    public Account createAccount(User user) {
        String accountNumber = generateUniqueAccountNumber();
        Account account = new Account();
        account.setAccountNumber(accountNumber);
        account.setBalance(0.0);
        return accountRepository.save(account);
    }
	
	private String generateUniqueAccountNumber() {
	    String accountNumber;
	    do {
            Random rand = new Random();
            accountNumber = String.valueOf(rand.nextInt((100000000 - 10000000) + 1) + 10000000);
	    } while (accountRepository.findByAccountNumber(accountNumber) != null);

	    return accountNumber;
	}

    @Override
    @Transactional
    public void cashDeposit(String accountNumber, String pin, double amount) {
        Account account = accountRepository.findByAccountNumber(userRepository.findByEmail(accountNumber).getAccount().getAccountNumber());
        if (account == null) {
            throw new NotFoundException("Account not found");
        }

        if (!passwordEncoder.matches(pin, account.getPin())) {
            throw new UnauthorizedException("Invalid PIN");
        }

        double currentBalance = account.getBalance();
        double newBalance = currentBalance + amount;
        account.setBalance(newBalance);
        accountRepository.save(account);

        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setTransaction_type("Deposit");
        transaction.setTransaction_date(new Date());
        transaction.setSourceAccount(account);
        transactionRepository.save(transaction);
    }
    
    @Override
    @Transactional
    public void cashWithdrawal(String accountNumber, String pin, double amount) {
        Account account = accountRepository.findByAccountNumber(userRepository.findByEmail(accountNumber).getAccount().getAccountNumber());
        if (account == null) {
            throw new NotFoundException("Account not found");
        }

        if (!passwordEncoder.matches(pin, account.getPin())) {
            throw new UnauthorizedException("Invalid PIN");
        }

        double currentBalance = account.getBalance();
        if (currentBalance < amount) {
            throw new InsufficientBalanceException("Insufficient balance");
        }

        double newBalance = currentBalance - amount;
        account.setBalance(newBalance);
        accountRepository.save(account);

        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setTransaction_type("Withdrawal");
        transaction.setTransaction_date(new Date());
        transaction.setSourceAccount(account);
        transactionRepository.save(transaction);
    }
    
    @Override
    @Transactional
    public void fundTransfer(String value, String targetAccountNumber, String pin, double amount) {
        String sourceAccountNumber= userRepository.findByEmail(value).getAccount().getAccountNumber();
        Account sourceAccount = accountRepository.findByAccountNumber(sourceAccountNumber);
        if (sourceAccount == null) {
            throw new NotFoundException("Source account not found");
        }

        Account targetAccount = accountRepository.findByAccountNumber(targetAccountNumber);
        if (targetAccount == null) {
            throw new NotFoundException("Target account not found");
        }

        if(sourceAccountNumber.equals(targetAccountNumber)){
            throw new UnauthorizedException("Source and Target Account can't be same");
        }

        if (!passwordEncoder.matches(pin, sourceAccount.getPin())) {
            throw new UnauthorizedException("Invalid PIN");
        }

        double sourceBalance = sourceAccount.getBalance();
        if (sourceBalance < amount) {
            throw new InsufficientBalanceException("Insufficient balance");
        }

        double newSourceBalance = sourceBalance - amount;
        sourceAccount.setBalance(newSourceBalance);
        accountRepository.save(sourceAccount);

        double targetBalance = targetAccount.getBalance();
        double newTargetBalance = targetBalance + amount;
        targetAccount.setBalance(newTargetBalance);
        accountRepository.save(targetAccount);

        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setTransaction_type("Fund Transfer");
        transaction.setTransaction_date(new Date());
        transaction.setSourceAccount(sourceAccount);
        transaction.setTargetAccount(targetAccount);
        transactionRepository.save(transaction);
    }
}
