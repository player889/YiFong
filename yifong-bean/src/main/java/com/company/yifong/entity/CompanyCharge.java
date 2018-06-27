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
	@Column(unique = true, nullable = false)
	private int seq;

	@Column(name = "destination_code", nullable = false, length = 10)
	@Enumerated(EnumType.ORDINAL)
	private Destination destinationCode;

	@Column(nullable = false)
	private int fee;

	private int outsourcing;

	private int pay;

	@Column(nullable = false)
	private int size;

	// bi-directional many-to-one association to Company
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "id", nullable = false)
	private Company company;

	public CompanyCharge() {
	}

	@JsonIgnore
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

	public int getOutsourcing() {
		return this.outsourcing;
	}

	public void setOutsourcing(int outsourcing) {
		this.outsourcing = outsourcing;
	}

	public int getPay() {
		return this.pay;
	}

	public void setPay(int pay) {
		this.pay = pay;
	}

	public int getSize() {
		return this.size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public Company getCompany() {
		return this.company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

}