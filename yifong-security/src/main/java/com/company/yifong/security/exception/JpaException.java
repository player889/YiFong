package com.company.yifong.security.exception;

public class JpaException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public JpaException() {
		super("後台錯誤");
	}

	public JpaException(final String message) {
		super(message);
	}

}
