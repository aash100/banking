package com.example.bankingbackend.controller;


import com.example.bankingbackend.dto.LoginRequest;
import com.example.bankingbackend.dto.UserResponse;
import com.example.bankingbackend.entity.User;
import com.example.bankingbackend.mapper.UserMapper;
import com.example.bankingbackend.security.JwtTokenUtil;
import com.example.bankingbackend.service.UserService;
import com.example.bankingbackend.wrapper.CommonResponseWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private UserService userService;

    private Logger logger = LoggerFactory.getLogger(UserController.class);
    
    @PostMapping("/register")
    public ResponseEntity<CommonResponseWrapper<UserResponse>> registerUser(@RequestBody UserMapper userMapper) {
        User registeredUser = userService.registerUser(userMapper);
        
        UserResponse userResponse = new UserResponse();
        userResponse.setName(registeredUser.getName());
        userResponse.setEmail(registeredUser.getEmail());
        userResponse.setAccountNumber(registeredUser.getAccount().getAccountNumber());
        userResponse.setAddress(registeredUser.getAddress());
        userResponse.setId(registeredUser.getId());
        userResponse.setAccountType(registeredUser.getAccount().getAccountType());
        return ResponseEntity.ok(new CommonResponseWrapper<UserResponse>(userResponse, "Registered Successfully", null));
    }
    
    @PostMapping("/login")
    public ResponseEntity<CommonResponseWrapper<String>> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Authenticate the user with the userId and password
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            // Invalid credentials, return 401 Unauthorized
            return new ResponseEntity<>(new CommonResponseWrapper<>(null, null, "Invalid User Id or Password") , HttpStatus.UNAUTHORIZED);
        }

        // If authentication successful, generate JWT token
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
        System.out.println(userDetails);
        String token = jwtTokenUtil.generateToken(userDetails);
        CommonResponseWrapper<String> data = new CommonResponseWrapper<String>(token, "LoggedIn Successfully", null);
        return new ResponseEntity<>(data , HttpStatus.OK);
    }

}
