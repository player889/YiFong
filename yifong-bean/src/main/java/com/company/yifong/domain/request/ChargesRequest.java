package com.company.yifong.domain.request;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Range;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChargesRequest implements Serializable {

	private static final long serialVersionUID = 1L;

	@NotBlank
	private String dest;

	@NotBlank
	@Range(min = 0, max = 3)
	private String size;

	@NotBlank
	@Range(min = 0, max = 99999)
	private String fee;

	@Range(min = 0, max = 99999)
	private String pay;

	@Range(min = 0, max = 99999)
	private String os;

	private Timestamp updateDate = new Timestamp(System.currentTimeMillis());

	public ChargesRequest() {
	}

	public String getDest() {
		return dest;
	}

	public void setDest(String dest) {
		this.dest = dest;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getFee() {
		return fee;
	}

	public void setFee(String fee) {
		this.fee = fee;
	}

	public String getPay() {
		return pay;
	}

	public void setPay(String pay) {
		this.pay = pay;
	}

	public String getOs() {
		return os;
	}

	public void setOs(String os) {
		this.os = os;
	}

	public Timestamp getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Timestamp updateDate) {
		this.updateDate = updateDate;
	}

}
