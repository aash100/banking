package com.example.bankingbackend.service;


import com.example.bankingbackend.entity.User;
import com.example.bankingbackend.mapper.UserMapper;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
	public User registerUser(UserMapper userMapper);

	public User getUserByAccountNumber(String account_no);

	public void saveUser(User user);

}
