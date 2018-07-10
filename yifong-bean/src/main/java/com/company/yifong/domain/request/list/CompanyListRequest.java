package com.company.yifong.domain.request.list;

import java.util.List;

import com.company.yifong.domain.request.CompanyRequest;

public class CompanyListRequest {
	// public class CompanyListRequest extends ArrayList<CompanyRequest> implements Serializable {

	// private static final long serialVersionUID = 1L;
	//
	// public CompanyListRequest() {
	// super();
	// }

	private List<CompanyRequest> list;

	public List<CompanyRequest> getList() {
		return list;
	}

	public void setList(List<CompanyRequest> list) {
		this.list = list;
	}

}
