package com.comany.yifong.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.company.yifong.domain.AjaxResponse;
import com.company.yifong.domain.status.ApiSatus;
import com.company.yifong.service.OrderService;
import com.fasterxml.jackson.core.JsonProcessingException;

@RestController
@RequestMapping("/order")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@PostMapping(value = "/init", produces = "application/json; charset=utf-8")
	public AjaxResponse init() throws JsonProcessingException {
		System.out.println("XXXXXXXX");
		return new AjaxResponse(ApiSatus.SUCC_QUERY, orderService.queryClientNoAndNames());
	}

}
