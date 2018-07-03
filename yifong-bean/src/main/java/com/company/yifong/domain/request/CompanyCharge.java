package com.company.yifong.domain.request;

import java.io.Serializable;
import java.util.Date;

import com.company.yifong.enums.Destination;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CompanyCharge implements Serializable {

	private static final long serialVersionUID = 1L;

	private Destination dest;
	private String size;
	private String fee;
	private String pay;
	private String os;
	private Date updateDate;

}
