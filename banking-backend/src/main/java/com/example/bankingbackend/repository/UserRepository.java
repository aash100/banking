package com.example.bankingbackend.repository;

import com.example.bankingbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    <Optional>User findByEmail(String email);

	User findByAccountAccountNumber(String accountNumber);
}
