package com.company.yifong.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.company.yifong.enums.Destination;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * The persistent class for the company_charge database table.
 * 
 */
@Entity
@Table(name = "company_charge")
@NamedQuery(name = "CompanyCharge.findAll", query = "SELECT c FROM CompanyCharge c")
public class CompanyCharge implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(unique = true, nullable = false)
	private int seq;

	@Column(name = "destination_code", nullable = false, length = 5)
	private Destination destinationCode;

	@Column(nullable = false)
	private int fee;

	// bi-directional many-to-one association to Company
	@JsonIgnore
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id", nullable = false)
	private Company company;

	public CompanyCharge() {
	}

	public int getSeq() {
		return this.seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

	@Enumerated(EnumType.ORDINAL)
	public String getDestinationCode() {
		return destinationCode.getType();
	}

	public void setDestinationCode(Destination destinationCode) {
		this.destinationCode = destinationCode;
	}

	public int getFee() {
		return this.fee;
	}

	public void setFee(int fee) {
		this.fee = fee;
	}

	public Company getCompany() {
		return this.company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	@Override
	public String toString() {
		return "CompanyCharge [seq=" + seq + ", destinationCode=" + destinationCode + ", fee=" + fee + ", company=" + company + "]";
	}

}