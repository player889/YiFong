package com.company.yifong.entity;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the common database table.
 * 
 */
@Entity
@Table(name="common")
@NamedQuery(name="Common.findAll", query="SELECT c FROM Common c")
public class Common implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(unique=true, nullable=false, length=5)
	private String key;

	@Column(nullable=false)
	private boolean enable;

	@Column(nullable=false, length=5)
	private String group;

	@Column(nullable=false, length=45)
	private String value;

	//bi-directional one-to-one association to CompanyCharge
	@OneToOne(mappedBy="common")
	private CompanyCharge companyCharge;

	public Common() {
	}

	public String getKey() {
		return this.key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public boolean getEnable() {
		return this.enable;
	}

	public void setEnable(boolean enable) {
		this.enable = enable;
	}

	public String getGroup() {
		return this.group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	public String getValue() {
		return this.value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public CompanyCharge getCompanyCharge() {
		return this.companyCharge;
	}

	public void setCompanyCharge(CompanyCharge companyCharge) {
		this.companyCharge = companyCharge;
	}

}