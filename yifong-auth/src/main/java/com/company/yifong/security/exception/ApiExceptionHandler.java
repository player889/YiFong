package com.company.yifong.security.exception;

import java.io.FileNotFoundException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.company.yifong.domain.AjaxResponse;
import com.company.yifong.domain.status.ApiSatus;

/**
 * Api exception handler.
 *
 * @Date 2018-05-28 17:40:17.267
 */
@ControllerAdvice
public class ApiExceptionHandler {

	@ExceptionHandler
	@ResponseBody
	public AjaxResponse handler(final HttpServletRequest req, final Exception e) {

		ApiSatus status = ApiSatus.ERR_SYS;

		if (e instanceof NullPointerException) {
			status = ApiSatus.ERR_NULL;
		} else if (e instanceof SecurityException) {
			status = ApiSatus.ERR_SECURITY;
		} else if (e instanceof NumberFormatException) {
			status = ApiSatus.ERR_SECURITY;
		} else if (e instanceof NoSuchFieldException) {
			status = ApiSatus.ERR_INPUT;
		} else if (e instanceof FileNotFoundException) {
			status = ApiSatus.ERR_FILE;
		}

		return new AjaxResponse(status, StringUtils.isEmpty(e.getMessage()) ? null : e.getMessage());
	}

	@ExceptionHandler(InputException.class)
	@ResponseBody
	public final AjaxResponse handlerCustomizedException(final InputException e) {
		return new AjaxResponse(ApiSatus.ERR_INPUT, StringUtils.isEmpty(e.getMessage()) ? null : e.getMessage());
	}

}
