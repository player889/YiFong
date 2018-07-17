package com.company.yifong.common;

import java.util.Arrays;
import java.util.EnumSet;
import java.util.stream.Collectors;

enum Programming implements T {
	java("1", 5),
	python("2", 6);

	private String type;
	private int index;

	private Programming(String type, int index) {
		this.type = type;
		this.index = index;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getList() {
		return this.type;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

//	@Override
//	public String toString() {
//		return String.valueOf(this.index);
//	}
//
	@Override
	public String a() {
		// TODO Auto-generated method stub
		return null;
	}

}

public class ClassDemo {

	public static void main(String[] args) {
		// Class<Programming> cls = ;
		//
		// ArrayList<String> a = new ArrayList<String>();
		// for (Object obj : Programming.class.getEnumConstants()) {
		// a.add(String.valueOf(obj));
		// }
		System.out.println(Arrays.asList(Programming.values()));

		System.out.println(EnumSet.allOf(Programming.class).stream().map(Enum::toString).collect(Collectors.toList()));
		// List<String> enumNames = Stream.of(Programming.values()).map(Enum::type).collect(Collectors.toList());

	}
}