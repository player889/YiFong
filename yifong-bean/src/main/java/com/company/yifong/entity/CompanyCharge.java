package com.company.yifong.entity;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;


/**
 * The persistent class for the company_charge database table.
 * 
 */
@Entity
@Table(name="company_charge")
@NamedQuery(name="CompanyCharge.findAll", query="SELECT c FROM CompanyCharge c")
public class CompanyCharge implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(unique=true, nullable=false)
	private int seq;

	@Column(nullable=false)
	private int fee;

	//bi-directional one-to-one association to Common
	@JsonIgnore
	@OneToOne
	@JoinColumn(name="destination_code", nullable=false)
	private Common common;

	//bi-directional many-to-one association to CompanyDetail
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="id", nullable=false)
	private CompanyDetail companyDetail;

	public CompanyCharge() {
	}

	public int getSeq() {
		return this.seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

	public int getFee() {
		return this.fee;
	}

	public void setFee(int fee) {
		this.fee = fee;
	}

	public Common getCommon() {
		return this.common;
	}

	public void setCommon(Common common) {
		this.common = common;
	}

	public CompanyDetail getCompanyDetail() {
		return this.companyDetail;
	}

	public void setCompanyDetail(CompanyDetail companyDetail) {
		this.companyDetail = companyDetail;
	}

}