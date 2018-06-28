package com.company.yifong.domain.request;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CompanyRequest implements Serializable {

	private static final long serialVersionUID = 1L;

	private String id;
	private String name;
	private CompanyDetail companyDetail;
	private List<CompanyCharge> companyCharges;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public CompanyDetail getCompanyDetail() {
		return companyDetail;
	}

	public void setCompanyDetail(CompanyDetail companyDetail) {
		this.companyDetail = companyDetail;
	}

	public List<CompanyCharge> getCompanyCharges() {
		return companyCharges;
	}

	public void setCompanyCharges(List<CompanyCharge> companyCharges) {
		this.companyCharges = companyCharges;
	}

}
