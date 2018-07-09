package com.comany.yifong.controller.api;

import java.lang.reflect.InvocationTargetException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.company.yifong.domain.AjaxResponse;
import com.company.yifong.domain.request.CyRequest;
import com.company.yifong.domain.status.ApiSatus;
import com.company.yifong.service.CyService;
import com.fasterxml.jackson.core.JsonProcessingException;

@RestController
@RequestMapping("/CY")
public class CyController {

	@Autowired
	private CyService cyService;

	@PostMapping(value = "/query", produces = "application/json; charset=utf-8")
	public AjaxResponse query(@RequestBody final CyRequest vo) throws JsonProcessingException, IllegalAccessException, InvocationTargetException, NoSuchMethodException {
		return new AjaxResponse(ApiSatus.SUCC_QUERY, cyService.query(vo));
	}

	@PostMapping(value = "/edit", produces = "application/json; charset=utf-8")
	public AjaxResponse edit(@RequestBody final CyRequest vo) throws JsonProcessingException, IllegalAccessException, InvocationTargetException, NoSuchMethodException {
		cyService.edit(vo);
		return new AjaxResponse(ApiSatus.SUCC_UPDATE);
	}

}
