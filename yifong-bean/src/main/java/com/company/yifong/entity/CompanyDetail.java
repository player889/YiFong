package com.company.yifong.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;

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
	@Column(unique = true, nullable = false, length = 5)
	private String id;

	@Column(nullable = false, length = 45)
	private String address;

	@Column(nullable = false, length = 45)
	private String name;

	@Column(nullable = false, length = 45)
	private String phone;

	// bi-directional one-to-one association to Company
	@JsonIgnore
	@OneToOne(mappedBy = "companyDetail", fetch = FetchType.EAGER)
	private Company company;

	public CompanyDetail() {
	}

	@JsonIgnore
	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
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

	@Override
	public String toString() {
		return "CompanyDetail [id=" + id + ", address=" + address + ", name=" + name + ", phone=" + phone + ", company=" + company + "]";
	}

}