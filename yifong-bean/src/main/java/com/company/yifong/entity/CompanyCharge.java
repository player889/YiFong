package com.company.yifong.entity;

import java.io.Serializable;
import javax.persistence.*;

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
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(unique = true, nullable = false)
	private int seq;

	@Column(name = "destination_code", nullable = false, length = 10)
	@Enumerated(EnumType.ORDINAL)
	private Destination destinationCode;

	@Column(nullable = false)
	private int fee;

	// bi-directional many-to-oned association to Company
	@JsonIgnore
	@ManyToOne
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

}