package com.example.bankingbackend.exception;

public class OtpRetryLimitExceededException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 2676963743942921043L;

	public OtpRetryLimitExceededException(String message) {
        super(message);
    }
}
