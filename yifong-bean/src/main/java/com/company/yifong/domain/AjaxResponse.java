package com.company.yifong.domain;

import com.company.yifong.domain.status.ApiSatus;

/**
 * Ajax return object.
 *
 * @Date 2018-05-28 17:19:38.840
 */
public class AjaxResponse {

	private String code;
	private String message;
	private Object data;

	public AjaxResponse() {
		super();
	}

	public AjaxResponse(final ApiSatus status) {
		this.invoke(status, null);
	}
	
	public AjaxResponse(final ApiSatus status, final Object data) {
		this.invoke(status, data);
	}

	public void invoke(final ApiSatus status, final Object data) {
		this.code = status.getCode();
		this.message = status.getMessage();
		this.data = data;
	}

	public String getCode() {
		return code;
	}

	public String getMessage() {
		return message;
	}

	public Object getData() {
		return data;
	}

}
