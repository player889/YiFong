package com.company.yifong.security.exception;

import java.io.FileNotFoundException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.util.StringUtils;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
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

	@ExceptionHandler(JpaException.class)
	@ResponseBody
	public final AjaxResponse handlerCustomizedException(final JpaException e) {
		return new AjaxResponse(ApiSatus.ERR_SYS, StringUtils.isEmpty(e.getMessage()) ? null : e.getMessage());
	}

	@ExceptionHandler(DataNotFoundException.class)
	@ResponseBody
	public final AjaxResponse handlerCustomizedException(final DataNotFoundException e) {
		return new AjaxResponse(ApiSatus.SUCC_DATA_NOT_FOUND, StringUtils.isEmpty(e.getMessage()) ? null : e.getMessage());
	}

	@ExceptionHandler(DataNotMatch.class)
	@ResponseBody
	public final AjaxResponse handlerCustomizedException(final DataNotMatch e) {
		return new AjaxResponse(ApiSatus.SUCC_DATA_NOT_FOUND, StringUtils.isEmpty(e.getMessage()) ? null : e.getMessage());
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseBody
	public final AjaxResponse handleValidationExceptions(MethodArgumentNotValidException e) {
		StringBuilder sb = new StringBuilder();
		List<ObjectError> objectErrorList = e.getBindingResult().getAllErrors();
		objectErrorList.forEach(error -> sb.append((sb.length() > 0 ? ", " : "") + error.getDefaultMessage()));
		return new AjaxResponse(ApiSatus.ERR_INPUT, sb.toString());
	}

	@ExceptionHandler(DataIntegrityViolationException.class)
	@ResponseBody
	public final AjaxResponse handleValidationExceptions(DataIntegrityViolationException e) {
		return new AjaxResponse(ApiSatus.ERR_INPUT, StringUtils.isEmpty(e.getMessage()) ? null : e.getMessage());
	}

}
