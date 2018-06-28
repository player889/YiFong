package com.company.yifong.security.exception;

public class DataNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public DataNotFoundException(final String message) {
		super(message);
	}

}
