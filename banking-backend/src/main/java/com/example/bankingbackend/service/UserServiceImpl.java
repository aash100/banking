package com.example.bankingbackend.service;

import com.example.bankingbackend.entity.Account;
import com.example.bankingbackend.entity.User;
import com.example.bankingbackend.exception.UnauthorizedException;
import com.example.bankingbackend.exception.UserValidation;
import com.example.bankingbackend.mapper.UserMapper;
import com.example.bankingbackend.repository.UserRepository;
import com.example.bankingbackend.security.JwtAuthenticationFilter;
import com.example.bankingbackend.util.LoggedinUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
	private UserRepository userRepository;

    @Autowired
    private AccountService accountService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    public User getUserByAccountNumber(String account_no) {
    	return userRepository.findByAccountAccountNumber(account_no);
    }
    
    
    @Override
    public User registerUser(UserMapper userMapper) {
        if(userRepository.findByEmail(userMapper.getUserDetails().getEmail())!=null){
            throw new UnauthorizedException("Email already exists");
        }
        User user = userMapper.getUserDetails();
    	 String encodedPassword = passwordEncoder.encode(user.getPassword());
         user.setPassword(encodedPassword);

        // Save the user details
        User savedUser = userRepository.save(user);

        // Create an account for the user
        Account account = accountService.createAccount(savedUser);
        String encodedPIN = passwordEncoder.encode(userMapper.getPin());

        account.setPin(encodedPIN);
        savedUser.setAccount(account);
        userRepository.save(savedUser);
        
        System.out.println(savedUser.getAccount().getAccountNumber());
        System.out.println(account.getUser().getName());

        
        return savedUser;
    }

	@Override
	public void saveUser(User user) {
		userRepository.save(user);
		
	}

}
