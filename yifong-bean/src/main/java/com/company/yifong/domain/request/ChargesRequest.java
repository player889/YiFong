package com.company.yifong.domain.request;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Range;

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

	@NotBlank
	private String dest;

	@NotBlank
	@Range(min = 0, max = 3)
	private String size;

	@NotBlank
	@Range(min = 0, max = 99999)
	private String fee;

	@Range(min = 0, max = 99999)
	private String pay;

	@Range(min = 0, max = 99999)
	private String os;

	private Timestamp updateDate = new Timestamp(System.currentTimeMillis());

}
