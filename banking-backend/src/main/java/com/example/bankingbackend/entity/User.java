package com.example.bankingbackend.entity;


import jakarta.persistence.*;

@Entity
@SequenceGenerator(name = "user_id_sequence", initialValue = 10000000, allocationSize = 100)
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_id_sequence")
	private Long id;
	private String name;
	private String password;

	@Column(unique = true)
	private String email;
	private String address;
	private String contactNo;
	private String dob;

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	// Establishing a one-to-one relationship with the account
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private Account account;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getContactNo() {
		return contactNo;
	}

	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}

	public Account getAccount() {
		return account;
	}

	// method to set the user's account
	public void setAccount(Account account) {
		this.account = account;
		account.setUser(this);
	}

}
