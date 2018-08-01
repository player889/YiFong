/**
 * 
 */
package com.company.yifong.domain;

/**
 *
 *
 * @author Jay
 * @date 2018-07-25
 */
public class BaseRequest {

	// current page
	private int pageIndex = 1;
	// row length per page
	private int pageSize = 10;
	// ?
	private int limit;
	// ?
	private int offset;

	public int getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public int getOffset() {
		return offset;
	}

	public void setOffset(int offset) {
		this.offset = offset;
	}

	// 22222222222222
	// current page
	private int start = 1;
	// row length per page
	private int length = 10;
	// counter
	private int draw;

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

	public int getDraw() {
		return draw;
	}

	public void setDraw(int draw) {
		this.draw = draw;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

}
