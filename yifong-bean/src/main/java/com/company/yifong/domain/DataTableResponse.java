/**
 * 
 */
package com.company.yifong.domain;

import org.springframework.data.domain.Page;

import com.fasterxml.jackson.core.JsonProcessingException;

/**
 *
 *
 * @author Jay
 * @date 2018-07-24
 */
public class DataTableResponse {

	private int draw;
	private int recordsTotal;
	private int recordsFiltered;
	private Object data;
	private String error;

	public DataTableResponse() {
		super();
	}

	public DataTableResponse(Page<?> page) throws JsonProcessingException {
		this.draw = page.getPageable().getPageNumber() + 1;
		this.recordsTotal = page.getTotalPages();
		this.recordsFiltered = Integer.parseInt(String.valueOf(page.getTotalElements()));
		this.data = page.getContent();
	}

	public int getDraw() {
		return draw;
	}

	public int getRecordsTotal() {
		return recordsTotal;
	}

	public int getRecordsFiltered() {
		return recordsFiltered;
	}

	public Object getData() {
		return data;
	}

	public String getError() {
		return error;
	}

}
