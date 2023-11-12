package com.example.bankingbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse  {

    private Long id;
    private String name;
    private String email;
    private String address;
    private String contactNo;
    private String accountNumber;
//    private String IFSC_code;
//    private String branch;
    private String accountType;
    
    
}
