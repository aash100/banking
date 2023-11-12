package com.example.bankingbackend.mapper;

import com.example.bankingbackend.entity.User;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserMapper {
    private User userDetails;

    private String pin;
}
