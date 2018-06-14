package com.comany.yifong.controller.api;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.company.yifong.common.EnumMap;
import com.company.yifong.domain.AjaxResponse;
import com.company.yifong.domain.status.ApiSatus;
import com.fasterxml.jackson.core.JsonProcessingException;

@RestController
@RequestMapping("/common")
public class CommonController {

	@PostMapping(value = "/destination", produces = "application/json; charset=utf-8")
	public AjaxResponse getDestination() throws JsonProcessingException {
		return new AjaxResponse(ApiSatus.SUCC_QUERY, EnumMap.getDestination());
	}

}
