/**
 * 
 */
package com.company.yifong.domain;

/**
 *
 *
 * @author Jay
 * @date 2018-07-24
 */
public class DataTable {
	// {
	// "draw": 1,
	// "recordsTotal": 10000,
	// "recordsFiltered": 3000,
	// "data": [
	// // ... skipped 20 records ...
	// ]
	// }
	// howing 1 to 20 of 3000 entries (filtered from 10000 total entries).
	private int draw;
	private int recordsTotal;
	private int recordsFiltered;
	private Object data;
	private String error;

	public int getDraw() {
		return draw;
	}

	public void setDraw(int draw) {
		this.draw = draw;
	}

	public int getRecordsTotal() {
		return recordsTotal;
	}

	public void setRecordsTotal(int recordsTotal) {
		this.recordsTotal = recordsTotal;
	}

	public int getRecordsFiltered() {
		return recordsFiltered;
	}

	public void setRecordsFiltered(int recordsFiltered) {
		this.recordsFiltered = recordsFiltered;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

}
