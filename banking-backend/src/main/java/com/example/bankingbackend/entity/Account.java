package com.example.bankingbackend.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(unique = true)
	private String accountNumber;
	private double balance;
	private String accountType = "Saving";
	private String accountStatus;
	private String pin;
	@OneToOne
	@JoinColumn(name = "user_id")
	private User user;

}
