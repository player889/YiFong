/**
 * 
 */
package com.company.yifong.domain.request;

/**
 *
 *
 * @author Jay
 * @date 2018-07-24
 */
public class Client_S {

	private String shortName;

	private int start;
	private int length;
	private int draw;

	public String getShortName() {
		return shortName;
	}

	public void setShortName(String shortName) {
		this.shortName = shortName;
	}

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
