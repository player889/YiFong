package com.company.yifong.domain.request;

import java.io.Serializable;

import com.company.yifong.enums.Destination;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CompanyCharge implements Serializable {

	private static final long serialVersionUID = 1L;

	private Destination destinationCode;
	private String fee;
	private String pay;
	private String size;
	private String outsourcing;

	public Destination getDestinationCode() {
		return destinationCode;
	}

	public void setDestinationCode(Destination destinationCode) {
		this.destinationCode = destinationCode;
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

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getOutsourcing() {
		return outsourcing;
	}

	public void setOutsourcing(String outsourcing) {
		this.outsourcing = outsourcing;
	}

}
