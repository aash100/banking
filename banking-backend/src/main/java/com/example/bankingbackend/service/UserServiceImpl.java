package com.example.bankingbackend.service;

import com.example.bankingbackend.entity.Account;
import com.example.bankingbackend.entity.User;
import com.example.bankingbackend.exception.UnauthorizedException;
import com.example.bankingbackend.exception.UserValidation;
import com.example.bankingbackend.mapper.UserMapper;
import com.example.bankingbackend.repository.UserRepository;
import com.example.bankingbackend.util.LoggedinUser;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

	private final UserRepository userRepository;
    private final AccountService accountService;
    private final PasswordEncoder passwordEncoder;


    public UserServiceImpl(UserRepository userRepository, AccountService accountService,PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.accountService = accountService;
        this.passwordEncoder =  passwordEncoder;
    }
    
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

    @Override
    public User updateUser(User user) {
        User existingUser = userRepository.findByAccountAccountNumber(LoggedinUser.getAccountNumber());
        if(user.getEmail() != null){
            if(user.getEmail().isEmpty())
                throw new UserValidation("Email can't be empty");
            else
                existingUser.setEmail(user.getEmail());
        }
        if(user.getName() != null){
            if(user.getName().isEmpty())
                throw new UserValidation("Name can't be empty");
            else
                existingUser.setName(user.getName());
        }
        if(user.getContactNo() != null){
            if(user.getContactNo().isEmpty())
                throw new UserValidation("Phone number can't be empty");
            else
                existingUser.setContactNo(user.getContactNo());
        }
        if(user.getAddress() != null){
            existingUser.setAddress(user.getAddress());
        }
        return userRepository.save(existingUser);
    }


}
