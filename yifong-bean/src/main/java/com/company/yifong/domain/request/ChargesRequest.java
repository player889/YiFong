package com.company.yifong.domain.request;

import java.io.Serializable;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChargesRequest implements Serializable {

	private static final long serialVersionUID = 1L;

	private String dest;
	private String size;
	private String fee;
	private String pay;
	private String os;
	private Timestamp updateDate = new Timestamp(System.currentTimeMillis());

}
