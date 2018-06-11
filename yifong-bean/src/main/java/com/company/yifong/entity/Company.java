package com.company.yifong.entity;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The persistent class for the company database table.
 * 
 */
@Entity
@Table(name = "company")
@NamedQuery(name = "Company.findAll", query = "SELECT c FROM Company c")
public class Company implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "company_id", unique = true, nullable = false, length = 5)
	private String companyId;

	@Column(name = "company_name", nullable = false, length = 20)
	private String companyName;

	// bi-directional one-to-one association to CompanyDetail
	@OneToOne(mappedBy = "company", cascade = CascadeType.ALL)
	private CompanyDetail companyDetail;

	public Company() {
	}

	public String getCompanyId() {
		return this.companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	public String getCompanyName() {
		return this.companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public CompanyDetail getCompanyDetail() {
		return this.companyDetail;
	}

	public void setCompanyDetail(CompanyDetail companyDetail) {
		this.companyDetail = companyDetail;
	}

}