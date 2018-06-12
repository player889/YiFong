package com.company.yifong.entity;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;


/**
 * The persistent class for the company_detail database table.
 * 
 */
@Entity
@Table(name="company_detail")
@NamedQuery(name="CompanyDetail.findAll", query="SELECT c FROM CompanyDetail c")
public class CompanyDetail implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(unique=true, nullable=false, length=5)
	private String id;

	@Column(nullable=false, length=45)
	private String address;

	@Column(nullable=false, length=45)
	private String name;

	@Column(nullable=false, length=45)
	private String phone;

	//bi-directional one-to-one association to Company
	@OneToOne(mappedBy="companyDetail")
	private Company company;

	//bi-directional many-to-one association to CompanyCharge
	@JsonIgnore
	@OneToMany(mappedBy="companyDetail", fetch=FetchType.EAGER)
	private List<CompanyCharge> companyCharges;

	public CompanyDetail() {
	}

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

	public List<CompanyCharge> getCompanyCharges() {
		return this.companyCharges;
	}

	public void setCompanyCharges(List<CompanyCharge> companyCharges) {
		this.companyCharges = companyCharges;
	}

	public CompanyCharge addCompanyCharge(CompanyCharge companyCharge) {
		getCompanyCharges().add(companyCharge);
		companyCharge.setCompanyDetail(this);

		return companyCharge;
	}

	public CompanyCharge removeCompanyCharge(CompanyCharge companyCharge) {
		getCompanyCharges().remove(companyCharge);
		companyCharge.setCompanyDetail(null);

		return companyCharge;
	}

}