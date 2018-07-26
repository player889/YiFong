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
	private int length;
	private Object data;
	private String error;

	private int currentPage;

	public DataTableResponse() {
		super();
	}

	public DataTableResponse(Page<?> page, int draw, int total, int currentPage) throws JsonProcessingException {
		this.draw = draw + 1;
		// page number
		this.recordsTotal = total;
		// 第 1 至 8 項結果，共 8 項
		this.recordsFiltered = total;
		this.data = page.getContent();
		this.length = 10;
		this.currentPage = currentPage;
		
		System.out.println("currentPage" + currentPage);
	}

	public DataTableResponse(Page<?> page) throws JsonProcessingException {
		this.draw = 1;
		this.recordsTotal = 50; // page number
		this.recordsFiltered = 50; // 第 1 至 8 項結果，共 8 項
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

	public int getLength() {
		return length;
	}

	public int getCurrentPage() {
		return currentPage;
	}

}
