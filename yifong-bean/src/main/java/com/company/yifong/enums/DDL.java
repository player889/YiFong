package com.company.yifong.enums;

public enum DDL {

	CHARGE_DESTINATION("1"),
	CONTAINER_SIZE("2");

	private DDL(String group) {
		this.group = group;
	}

	private String group;

	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

}
