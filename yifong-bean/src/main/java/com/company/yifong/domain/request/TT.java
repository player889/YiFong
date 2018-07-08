package com.company.yifong.domain.request;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TT implements Serializable {

	private static final long serialVersionUID = 1L;

	@NotBlank
	private String no;

}
