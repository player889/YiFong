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
