package com.company.yifong.common;

import java.util.LinkedList;
import java.util.List;

import com.company.yifong.enums.Destination;
import com.fasterxml.jackson.core.JsonProcessingException;

public class EnumMap {

	public static List<String> getDestination() throws JsonProcessingException {
		List<String> list = new LinkedList<String>();
		for (Destination destination : Destination.values()) {
			list.add(destination.getType());
		}
		return list;
	}
}
