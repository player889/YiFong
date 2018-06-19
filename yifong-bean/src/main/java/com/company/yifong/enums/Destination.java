package com.company.yifong.enums;

public enum Destination {

	KEELUNG("基隆"),
	KEELUNG_TAICHUNG("基隆-台中"),
	KEELUNG_CHANGHUA("基隆-彰化"),
	TAIPEI("台北港"),
	TAOYUAN("桃園"),
	GUANYIN("觀音"),
	YANGMEI("楊梅"),
	HUKOU("湖口"),
	TAICHUNG("台中"),
	TAICHUNG_TONGLUO("台中-銅鑼"),
	TAICHUNG_CHANGHUA("台中-彰化"),
	CHIAYI("嘉義"),
	KAOHSIUNG("高雄");

	private String type;

	private Destination(String type) {
		this.type = type;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}
