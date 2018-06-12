package com.company.yifong.domain.response;

import java.util.List;

import com.company.yifong.entity.Common;
import com.company.yifong.entity.CompanyCharge;
import com.company.yifong.entity.CompanyDetail;

public class CompanyResponse {

	private String id;
	private String name;
	private List<CompanyCharge> charge;
	private List<CompanyDetail> detail;
	private List<Common> commmon;

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

	public List<CompanyCharge> getCharge() {
		return charge;
	}

	public void setCharge(List<CompanyCharge> charge) {
		this.charge = charge;
	}

	public List<CompanyDetail> getDetail() {
		return detail;
	}

	public void setDetail(List<CompanyDetail> detail) {
		this.detail = detail;
	}

	public List<Common> getCommmon() {
		return commmon;
	}

	public void setCommmon(List<Common> commmon) {
		this.commmon = commmon;
	}

}
