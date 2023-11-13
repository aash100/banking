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
import jakarta.transaction.Transactional;
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

	@Override
    public Account createAccount(User user) {
        String accountNumber = generateUniqueAccountNumber();
        Account account = new Account();
        account.setAccountNumber(accountNumber);
        account.setBalance(0.0);
        return accountRepository.save(account);
    }
	
//	@Override
//    public boolean isPinCreated(String accountNumber) {
//        Account account = accountRepository.findByAccountNumber(accountNumber);
//        if (account == null) {
//            throw new NotFoundException("Account not found");
//        }
//
//        return account.getPin()!=null;
//    }
    
	private String generateUniqueAccountNumber() {
	    String accountNumber;
	    do {
	        // Generate a UUID as the account number
            Random rand = new Random();
            accountNumber = String.valueOf(rand.nextInt((100000000 - 10000000) + 1) + 10000000);
//            accountNumber = String.valueOf(rand.nextLong(100000000));
//	        accountNumber = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 6);
	    } while (accountRepository.findByAccountNumber(accountNumber) != null);

	    return accountNumber;
	}

    
    
//    @Override
//    public void createPIN(String accountNumber, String password, String pin) {
//        Account account = accountRepository.findByAccountNumber(accountNumber);
//        if (account == null) {
//            throw new NotFoundException("Account not found");
//        }
//
//        if (!passwordEncoder.matches(password, account.getUser().getPassword())) {
//            throw new UnauthorizedException("Invalid password");
//        }
//
//        account.setPin(passwordEncoder.encode(pin));
//        accountRepository.save(account);
//    }
    
//    @Override
//    public void updatePIN(String accountNumber, String oldPIN, String password, String newPIN) {
//    	System.out.println(accountNumber+"  "+oldPIN+" "+newPIN+"  "+password);
//
//        Account account = accountRepository.findByAccountNumber(accountNumber);
//        if (account == null) {
//            throw new NotFoundException("Account not found");
//        }
//
//        if (!passwordEncoder.matches(oldPIN, account.getPin())) {
//            throw new UnauthorizedException("Invalid PIN");
//        }
//
//        if (!passwordEncoder.matches(password, account.getUser().getPassword())) {
//            throw new UnauthorizedException("Invalid password");
//        }
//
//        account.setPin(passwordEncoder.encode(newPIN));
//        accountRepository.save(account);
//    }
    
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
//        if (!account.getPin().equals(pin)) {
//            throw new UnauthorizedException("Invalid PIN");
//        }

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
//        if (!sourceAccount.getPin().equals(pin)) {
//            throw new UnauthorizedException("Invalid PIN");
//        }

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
