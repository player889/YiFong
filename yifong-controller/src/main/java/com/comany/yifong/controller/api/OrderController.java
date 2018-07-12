package com.comany.yifong.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.company.yifong.domain.AjaxResponse;
import com.company.yifong.domain.request.OrderRequest;
import com.company.yifong.domain.status.ApiSatus;
import com.company.yifong.service.OrderService;
import com.fasterxml.jackson.core.JsonProcessingException;

@RestController
@RequestMapping("/order")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@PostMapping(value = "/client/charges", produces = "application/json; charset=utf-8")
	public AjaxResponse getCharges(@RequestBody final OrderRequest vo) throws JsonProcessingException {
		return new AjaxResponse(ApiSatus.SUCC_QUERY, orderService.queryCharges(vo.getNo()));
	}
}
