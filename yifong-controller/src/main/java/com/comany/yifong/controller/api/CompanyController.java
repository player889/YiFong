package com.comany.yifong.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.company.yifong.common.MyBeanUitls;
import com.company.yifong.domain.AjaxResponse;
import com.company.yifong.domain.request.CompanyRequest;
import com.company.yifong.domain.status.ApiSatus;
import com.company.yifong.entity.Company;
import com.company.yifong.entity.CompanyDetail;
import com.company.yifong.service.CompanyService;

@RestController
@RequestMapping("/company")
public class CompanyController {

	@Autowired
	private CompanyService companyService;

	@PostMapping(value = "/findAll", produces = "application/json; charset=utf-8")
	public AjaxResponse findAll(@RequestBody final CompanyRequest vo, final BindingResult errors) {

		final AjaxResponse response = new AjaxResponse();
		response.invoke(ApiSatus.SUCC_QUERY, companyService.findAll());

		return response;

	}

	@PostMapping(value = "/findByCompanyId", produces = "application/json; charset=utf-8")
	public AjaxResponse find(@RequestBody final CompanyRequest vo, final BindingResult errors) {

		final AjaxResponse response = new AjaxResponse();
		Company data = companyService.findByCompanyId(vo.getCompanyId());
		response.invoke(ApiSatus.SUCC_QUERY, data);

		return response;

	}

	@PostMapping(value = "/findByCondition", produces = "application/json; charset=utf-8")
	public AjaxResponse findByCondition(@RequestBody final CompanyRequest vo, final BindingResult errors) {

		final AjaxResponse response = new AjaxResponse();
		Company data = new Company();

		MyBeanUitls.BeanCopy(vo, data);

		Page<Company> result = companyService.findByCondition(data);
		response.invoke(ApiSatus.SUCC_QUERY, result);

		return response;

	}

	@PostMapping(value = "/save", produces = "application/json; charset=utf-8")
	public AjaxResponse save(@RequestBody final CompanyRequest vo, final BindingResult errors) {

		final AjaxResponse response = new AjaxResponse();

		companyService.save(this.mockData());

		response.invoke(ApiSatus.SUCC_SAVE, null);

		return response;

	}

	@PostMapping("/list")
	public AjaxResponse list(int page, int rows, String userName, String realName, String telephone) {
		final AjaxResponse response = new AjaxResponse();
		return response;
	}

	private Company mockData() {
		Company company = new Company();
		company.setCompanyId("7");
		company.setCompanyName("伍氏");

		CompanyDetail companyDetail = new CompanyDetail();
		companyDetail.setName("伍氏科技股份有限公司");
		companyDetail.setPhone("03-5382105");
		companyDetail.setFkCompanyId("7");

		company.setCompanyDetail(companyDetail);

		return company;
	}

}
