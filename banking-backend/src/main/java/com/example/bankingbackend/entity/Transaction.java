package com.example.bankingbackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
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

	@Override
	public String toString() {
		return "Transaction [id=" + id + ", amount=" + amount + ", transaction_type=" + transaction_type
				+ ", transaction_date=" + transaction_date + ", sourceAccount=" + sourceAccount + ", targetAccount="
				+ targetAccount + "]";
	}

}
