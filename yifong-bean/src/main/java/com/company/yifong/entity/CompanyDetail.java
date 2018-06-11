package com.company.yifong.entity;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * The persistent class for the company_detail database table.
 * 
 */
@Entity
@Table(name = "company_detail")
@NamedQuery(name = "CompanyDetail.findAll", query = "SELECT c FROM CompanyDetail c")
public class CompanyDetail implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "fk_company_id", unique = true, nullable = false, length = 5)
	private String fkCompanyId;

	@Column(nullable = false, length = 45)
	private String name;

	@Column(nullable = false, length = 20)
	private String phone;

	// bi-directional one-to-one association to Company
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "fk_company_id", nullable = false, insertable = false, updatable = false)
	@JsonIgnore
	private Company company;

	public CompanyDetail() {
	}

	public String getFkCompanyId() {
		return this.fkCompanyId;
	}

	public void setFkCompanyId(String fkCompanyId) {
		this.fkCompanyId = fkCompanyId;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Company getCompany() {
		return this.company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

}