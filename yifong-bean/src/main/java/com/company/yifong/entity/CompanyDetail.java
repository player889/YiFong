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
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(unique = true, nullable = false, length = 5)
	private String id;

	@Column(nullable = false, length = 45)
	private String address;

	@Column(name = "gui_number", length = 8)
	private String guiNumber;

	@Column(nullable = false, length = 45)
	private String name;

	@Column(nullable = false, length = 45)
	private String phone;

	// bi-directional one-to-one association to Company
	@JsonIgnore
	@OneToOne(mappedBy = "companyDetail", cascade = { CascadeType.ALL })
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

	public String getGuiNumber() {
		return this.guiNumber;
	}

	public void setGuiNumber(String guiNumber) {
		this.guiNumber = guiNumber;
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