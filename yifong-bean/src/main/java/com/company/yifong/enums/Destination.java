package com.company.yifong.enums;

public enum Destination {

	KEELUNG("基隆"),
	TAIPEI("台北港"),
	TAOYUAN("桃園"),
	YANGMEI("楊梅"),
	HUKOU("湖口"),
	TAICHUNG("台中"),
	KAOHSIUNG("高雄"),
	FORTYPLUS("40尺加"),
	INSPECTION("貼儀檢"),
	TWO_PLACE("下2處貼"),
	TWO_CABINET("2櫃優待"),
	OTHER("貼其他"),
	POUNDS("過磅"),
	COMMENTS("備註"),
	OIL("油價標準"),
	SEND_PRICE("指送單價");

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
