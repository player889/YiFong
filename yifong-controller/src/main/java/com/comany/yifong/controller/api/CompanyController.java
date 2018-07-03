package com.comany.yifong.controller.api;

import java.lang.reflect.InvocationTargetException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.company.yifong.domain.AjaxResponse;
import com.company.yifong.domain.request.CompanyRequest;
import com.company.yifong.domain.status.ApiSatus;
import com.company.yifong.entity.Client;
import com.company.yifong.entity.Company;
import com.company.yifong.service.CompanyService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/company")
public class CompanyController {

	@Autowired
	private CompanyService companyService;

	@Autowired
	private ObjectMapper objectMapper;

	@PostMapping(value = "/find/client", produces = "application/json; charset=utf-8")
	public AjaxResponse findClient(@RequestBody final CompanyRequest vo, final BindingResult errors) throws IllegalAccessException, InvocationTargetException {
		Client data = new Client();
		if (StringUtils.isNotBlank(vo.getClient().getNo())) {
			data.setNo(vo.getClient().getNo());
		} else {
			data.setShortName(vo.getClient().getShortName());
		}
		return new AjaxResponse(ApiSatus.SUCC_QUERY, companyService.findClient(data));
	}

	@PostMapping(value = "/edit", produces = "application/json; charset=utf-8")
	public AjaxResponse edit(@RequestBody final CompanyRequest vo, final BindingResult errors) throws JsonProcessingException, IllegalAccessException, InvocationTargetException, NoSuchMethodException {
		companyService.edit(vo);
		return new AjaxResponse(ApiSatus.SUCC_UPDATE);
	}

	@PostMapping(value = "/save", produces = "application/json; charset=utf-8")
	public AjaxResponse save(@RequestBody final CompanyRequest vo, final BindingResult errors) throws JsonProcessingException, IllegalAccessException, InvocationTargetException, NoSuchMethodException {
		Company data = objectMapper.convertValue(vo, Company.class);
		// return new AjaxResponse(ApiSatus.SUCC_SAVE, companyService.save(data));
		return new AjaxResponse(ApiSatus.SUCC_SAVE);
	}

}
