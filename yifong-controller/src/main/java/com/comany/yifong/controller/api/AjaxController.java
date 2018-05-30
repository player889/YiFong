package com.comany.yifong.controller.api;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.company.yifong.domain.AjaxResponse;
import com.company.yifong.domain.request.TestRequest;
import com.company.yifong.domain.response.TestResponse;
import com.company.yifong.domain.status.ApiSatus;
import com.company.yifong.security.exception.InputException;

@RestController
public class AjaxController {

	@PostMapping(value = "/ajaxTest", produces = "application/json; charset=utf-8")
	public AjaxResponse ajaxTest(@RequestBody final TestRequest vo, final BindingResult errors) {
		final AjaxResponse response = new AjaxResponse();

		final TestResponse data = new TestResponse();

		data.setAccount("XXXX");
		if (1 < vo.getCk().size()) {
			throw new InputException("輸入錯誤.....");
		} else if ("r2".equals(vo.getRadio())) {
			data.setPassword("DDD");
			response.invoke(ApiSatus.ERR_DATA_NOT_FOUND, data);
		} else {
			response.invoke(ApiSatus.SUCC_QUERY, data);
		}

		return response;

	}

}
