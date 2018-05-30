package com.company.yifong.domain.request;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

public class TestRequest {

	// @NotBlank(message = "username can't empty!")
	private String id;
	private String name;

	private String city;

	@JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
	private List<String> ck;
	private String radio;

	public String getId() {
		return id;
	}

	public void setId(final String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(final String name) {
		this.name = name;
	}

	public String getCity() {
		return city;
	}

	public void setCity(final String city) {
		this.city = city;
	}

	public List<String> getCk() {
		return ck;
	}

	public void setCk(final List<String> ck) {
		this.ck = ck;
	}

	public String getRadio() {
		return radio;
	}

	public void setRadio(final String radio) {
		this.radio = radio;
	}

	@Override
	public String toString() {
		return "TestRequest [id=" + id + ", name=" + name + ", city=" + city + ", ck=" + ck + ", radio=" + radio + "]";
	}

}
