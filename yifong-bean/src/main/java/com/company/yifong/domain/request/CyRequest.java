package com.company.yifong.domain.request;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CyRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer seq;
	private String no;
	private String area;
	private String name;

	private Integer used;
	private String address;
	private String phone;

}
