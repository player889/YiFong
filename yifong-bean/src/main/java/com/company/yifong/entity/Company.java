package com.company.yifong.entity;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the company database table.
 * 
 */
@Entity
@Table(name="company")
@NamedQuery(name="Company.findAll", query="SELECT c FROM Company c")
public class Company implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(unique=true, nullable=false, length=5)
	private String id;

	@Column(nullable=false, length=6)
	private String name;

	//bi-directional one-to-one association to CompanyDetail
	@OneToOne(cascade={CascadeType.ALL})
	@JoinColumn(name="id", nullable=false, insertable=false, updatable=false)
	private CompanyDetail companyDetail;

	//bi-directional many-to-one association to CompanyCharge
	@OneToMany(mappedBy="company", fetch=FetchType.EAGER)
	private List<CompanyCharge> companyCharges;

	public Company() {
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public CompanyDetail getCompanyDetail() {
		return this.companyDetail;
	}

	public void setCompanyDetail(CompanyDetail companyDetail) {
		this.companyDetail = companyDetail;
	}

	public List<CompanyCharge> getCompanyCharges() {
		return this.companyCharges;
	}

	public void setCompanyCharges(List<CompanyCharge> companyCharges) {
		this.companyCharges = companyCharges;
	}

	public CompanyCharge addCompanyCharge(CompanyCharge companyCharge) {
		getCompanyCharges().add(companyCharge);
		companyCharge.setCompany(this);

		return companyCharge;
	}

	public CompanyCharge removeCompanyCharge(CompanyCharge companyCharge) {
		getCompanyCharges().remove(companyCharge);
		companyCharge.setCompany(null);

		return companyCharge;
	}

}