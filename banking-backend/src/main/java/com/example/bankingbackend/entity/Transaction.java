package com.example.bankingbackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@Entity
@ToString
public class Transaction {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private double amount;
	private String transaction_type;
	private Date transaction_date;

	@ManyToOne
	@JoinColumn(name = "source_account_id")
	private Account sourceAccount;

	@ManyToOne
	@JoinColumn(name = "target_account_id")
	private Account targetAccount;

}
