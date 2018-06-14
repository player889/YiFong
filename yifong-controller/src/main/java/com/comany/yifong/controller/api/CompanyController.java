package com.comany.yifong.controller.api;

import java.lang.reflect.InvocationTargetException;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.company.yifong.domain.AjaxResponse;
import com.company.yifong.domain.request.CompanyRequest;
import com.company.yifong.domain.status.ApiSatus;
import com.company.yifong.entity.Company;
import com.company.yifong.entity.CompanyDetail;
import com.company.yifong.service.CompanyService;
import com.fasterxml.jackson.core.JsonProcessingException;

@RestController
@RequestMapping("/company")
public class CompanyController {

	@Autowired
	private CompanyService companyService;

	@PostMapping(value = "/find/list", produces = "application/json; charset=utf-8")
	public AjaxResponse findList(@RequestBody final CompanyRequest vo, final BindingResult errors) throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
		Company data = new Company();
		BeanUtils.copyProperties(data, vo);
		return new AjaxResponse(ApiSatus.SUCC_QUERY, companyService.findList(data));
	}

	@PostMapping(value = "/find/{id}", produces = "application/json; charset=utf-8")
	public AjaxResponse findDetail(@PathVariable(value = "id") String id) throws IllegalAccessException, InvocationTargetException, JsonProcessingException {
		return new AjaxResponse(ApiSatus.SUCC_QUERY, companyService.findDetail(id));
	}

	// NOTE
	@PostMapping(value = "/save", produces = "application/json; charset=utf-8")
	public AjaxResponse save(@RequestBody final CompanyRequest vo, final BindingResult errors) {
		companyService.save(this.mockData());
		return new AjaxResponse(ApiSatus.SUCC_SAVE, null);
	}

	private Company mockData() {
		Company company = new Company();
		company.setId("7");
		company.setName("伍氏");

		CompanyDetail companyDetail = new CompanyDetail();
		companyDetail.setName("伍氏科技股份有限公司");
		companyDetail.setPhone("03-5382105");

		company.setCompanyDetail(companyDetail);

		return company;
	}

}
