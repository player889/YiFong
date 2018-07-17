package com.company.yifong.security.exception;

public class DataNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public DataNotFoundException() {
		super("查無資料");
	}

	public DataNotFoundException(final String message) {
		super(message);
	}

}
