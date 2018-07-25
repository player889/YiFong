/**
 * 
 */
package com.company.yifong.domain.request;

import com.company.yifong.domain.BaseRequest;

/**
 *
 *
 * @author Jay
 * @date 2018-07-24
 */
public class Client extends BaseRequest {

	private String shortName;

	public String getShortName() {
		return shortName;
	}

	public void setShortName(String shortName) {
		this.shortName = shortName;
	}

}
