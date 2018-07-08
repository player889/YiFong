package com.company.yifong.domain.request;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.company.yifong.customized.GuiNumber;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
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

}