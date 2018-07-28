/**
 * 
 */
package com.company.yifong.domain;

import java.util.List;

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
	private int length;
	private Object data;
	private String error;

	public DataTableResponse() {
		super();
	}
	
	public DataTableResponse(int draw, List<?> page) throws JsonProcessingException {
		this.draw = draw + 1;
		// page number
		this.recordsTotal = page.size();
		// 第 1 至 8 項結果，共 8 項
		this.recordsFiltered = page.size();
		this.data = page;
		this.length = 10;
	}

	public DataTableResponse(int draw, Page<?> page, int total) throws JsonProcessingException {
		this.draw = draw + 1;
		// page number
		this.recordsTotal = total;
		// 第 1 至 8 項結果，共 8 項
		this.recordsFiltered = total;
		this.data = page.getContent();
		this.length = 10;
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

	public int getLength() {
		return length;
	}

}
