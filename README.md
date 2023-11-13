# Banking Application With Spring Boot And Angular with Spring Security

# Introduction

This project helps us to understand the basic working of Bank accounts and their operations under the session window. Some of the functionalities implemented are
- User Registration and User Login
- Account creation
- Deposit in Account
- Withdrawal from Account
- Transactions between two accounts
- Showing Account Details includes Available balance and Fetching the transaction history

# Prerequisites
- java 1.8.x
- maven 3.x
- npm

# Steps To Setup Backend

**1. Clone the repository**
    git clone https://github.com/aash100/banking.git

**2. Move to root directory of backend**

**3. Build project**
    mvn clean install

**4. Run project** 
    java -jar target/banking-backend-0.0.1-SNAPSHOT.jar
-   Alternatively, you can run the app without packaging it using 
    mvn spring-boot:run
```
# Explore apis in backend
API will be hosted at the port 8080 of localhost
i.e. http://localhost:8080/

The app defines following APIs. 
 
    POST /api/users/login   
    POST /api/users/register
    GET /api/dashboard/user
    GET /api/dashboard/account
    POST /api/account/deposit
    POST /api/account/withdraw
    POST /api/account/fund-transfer
    GET /api/account/transactions   

# Steps To Setup Frontend

**1. Move To Frontend Directory**

**2. Install Package**
    npm install
**3. Run Project**
    npm start
**4. Open url**
    http://localhost:4200/
