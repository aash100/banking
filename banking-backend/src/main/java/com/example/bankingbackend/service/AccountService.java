package com.example.bankingbackend.service;


import com.example.bankingbackend.entity.Account;
import com.example.bankingbackend.entity.User;

public interface AccountService {

	public Account createAccount(User user);
//	public boolean isPinCreated(String accountNumber) ;
//	public void createPIN(String accountNumber, String password, String pin) ;
//	public void updatePIN(String accountNumber, String oldPIN, String password, String newPIN);
	public void cashDeposit(String accountNumber, String pin, double amount);
	public void cashWithdrawal(String accountNumber, String pin, double amount);
	public void fundTransfer(String sourceAccountNumber, String targetAccountNumber, String pin, double amount);
	
	
}
