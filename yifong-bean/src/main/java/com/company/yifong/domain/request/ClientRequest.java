package com.company.yifong.domain.request;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ClientRequest implements Serializable {

	private static final long serialVersionUID = 1L;

	private String no;
	private String shortName;
	private String fullName;
	private String address;
	private String phone;
	private String guiNumber;
	private String memo;
	private String updateDate;

}