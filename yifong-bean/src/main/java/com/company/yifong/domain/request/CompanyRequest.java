package com.company.yifong.domain.request;

import java.io.Serializable;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CompanyRequest implements Serializable {

	CompanyRequest() {
	}

	private static final long serialVersionUID = 1L;

	@Valid
	private ClientRequest client;

	@NotNull
	@Valid
	private List<ChargesRequest> charges;

	public ClientRequest getClient() {
		return client;
	}

	public void setClient(ClientRequest client) {
		this.client = client;
	}

	public List<ChargesRequest> getCharges() {
		return charges;
	}

	public void setCharges(List<ChargesRequest> charges) {
		this.charges = charges;
	}

}
