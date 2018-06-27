package com.company.yifong.enums;

public enum Destination {

	KEELUNG("基隆", "0"),
	KEELUNG_TAICHUNG("基隆-台中", "1"),
	KEELUNG_CHANGHUA("基隆-彰化", "2"),
	TAIPEI("台北港", "3"),
	TAOYUAN("桃園", "4"),
	GUANYIN("觀音", "5"),
	YANGMEI("楊梅", "6"),
	HUKOU("湖口", "7"),
	TAICHUNG("台中", "8"),
	TAICHUNG_TONGLUO("台中-銅鑼", "9"),
	TAICHUNG_CHANGHUA("台中-彰化", "10"),
	CHIAYI("嘉義", "11"),
	KAOHSIUNG("高雄", "12");

	private String type;
	private String index;

	private Destination(String type, String index) {
		this.type = type;
		this.index = index;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getIndex() {
		return index;
	}

	public void setIndex(String index) {
		this.index = index;
	}

}
