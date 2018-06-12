package com.comany.yifong.controller.api;

import java.lang.reflect.InvocationTargetException;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.company.yifong.domain.AjaxResponse;
import com.company.yifong.domain.request.CompanyRequest;
import com.company.yifong.domain.response.CompanyResponse;
import com.company.yifong.domain.status.ApiSatus;
import com.company.yifong.entity.Company;
import com.company.yifong.entity.CompanyDetail;
import com.company.yifong.service.CompanyService;

@RestController
@RequestMapping("/company")
public class CompanyController {

	@Autowired
	private CompanyService companyService;

	@PostMapping(value = "/findByCondition", produces = "application/json; charset=utf-8")
	public AjaxResponse findByCondition(@RequestBody final CompanyRequest vo, final BindingResult errors) throws IllegalAccessException, InvocationTargetException {

		final AjaxResponse response = new AjaxResponse();
		Company data = new Company();
		BeanUtils.copyProperties(data, vo);

		response.invoke(ApiSatus.SUCC_QUERY, companyService.findByCondition(data));

		return response;
	}

	@PostMapping(value = "/detail/{id}", produces = "application/json; charset=utf-8")
	public AjaxResponse findDetailById(@PathVariable(value = "id") String id) throws IllegalAccessException, InvocationTargetException {
		System.out.println(" === ");
		System.out.println(id);
		final AjaxResponse response = new AjaxResponse();

		CompanyDetail companyDetail = new CompanyDetail();
		companyDetail.setId(id);

		response.invoke(ApiSatus.SUCC_QUERY, companyService.findDetailById(companyDetail));

		return response;
	}

	@PostMapping(value = "/findTest/{id}", produces = "application/json; charset=utf-8")
	public AjaxResponse findTest(@PathVariable(value = "id") String id) throws IllegalAccessException, InvocationTargetException {
		System.out.println(" === ");
		System.out.println(id);
		final AjaxResponse response = new AjaxResponse();

		CompanyDetail companyDetail = new CompanyDetail();
		companyDetail.setId(id);

		Page<Company> c = companyService.findTest(companyDetail);	

		CompanyResponse resp = new CompanyResponse();

		response.invoke(ApiSatus.SUCC_QUERY, c);

		return response;
	}

	// @PostMapping(value = "/save", produces = "application/json; charset=utf-8")
	// public AjaxResponse save(@RequestBody final CompanyRequest vo, final BindingResult errors) {
	//
	// final AjaxResponse response = new AjaxResponse();
	//
	// companyService.save(this.mockData());
	//
	// response.invoke(ApiSatus.SUCC_SAVE, null);
	//
	// return response;
	//
	// }

	@PostMapping("/list")
	public AjaxResponse list(int page, int rows, String userName, String realName, String telephone) {
		final AjaxResponse response = new AjaxResponse();
		return response;
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
