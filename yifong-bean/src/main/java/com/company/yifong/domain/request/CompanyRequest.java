package com.company.yifong.domain.request;

import java.io.Serializable;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CompanyRequest implements Serializable {

	private static final long serialVersionUID = 1L;

	@Valid
	private ClientRequest client;

	@NotNull
	@Valid
	private List<ChargesRequest> charges;

}
