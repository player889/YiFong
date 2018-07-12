package com.company.yifong.domain.request;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.company.yifong.customized.GuiNumber;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ClientRequest implements Serializable {

	private static final long serialVersionUID = 1L;

	@NotBlank
	@Size(min = 1, max = 5)
	private String no;
	@NotBlank
	private String shortName;
	@NotBlank
	private String fullName;
	@NotBlank
	private String address;
	@NotBlank
	private String phone;
	@GuiNumber
	private String guiNumber;
	private String memo;
	private String updateDate;

	public ClientRequest() {
	}

	public String getNo() {
		return no;
	}

	public void setNo(String no) {
		this.no = no;
	}

	public String getShortName() {
		return shortName;
	}

	public void setShortName(String shortName) {
		this.shortName = shortName;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getGuiNumber() {
		return guiNumber;
	}

	public void setGuiNumber(String guiNumber) {
		this.guiNumber = guiNumber;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

}