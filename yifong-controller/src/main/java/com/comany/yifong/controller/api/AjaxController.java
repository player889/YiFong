package com.comany.yifong.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.company.yifong.domain.AjaxResponse;
import com.company.yifong.domain.request.TestRequest;
import com.company.yifong.domain.response.TestResponse;
import com.company.yifong.domain.status.ApiSatus;
import com.company.yifong.security.exception.InputException;
import com.company.yifong.service.UserService;

@RestController
public class AjaxController {

	@Autowired
	private UserService userService;

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

	@PostMapping(value = "/jpaTest", produces = "application/json; charset=utf-8")
	public AjaxResponse jpaTest(@RequestBody final TestRequest vo, final BindingResult errors) {
		final AjaxResponse response = new AjaxResponse();
		response.invoke(ApiSatus.SUCC_QUERY, userService.findByAccount("root"));
		return response;
	}

}
