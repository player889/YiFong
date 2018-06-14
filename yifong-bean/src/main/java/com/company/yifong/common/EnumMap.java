package com.company.yifong.common;

import java.util.LinkedHashMap;
import java.util.Map;

import com.company.yifong.enums.Destination;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class EnumMap {

	public static String getDestination() throws JsonProcessingException {
		Map<Integer, String> temp = new LinkedHashMap<Integer, String>();
		for (int i = 0; i < Destination.values().length; i++) {
			temp.put(i, Destination.values()[i].getType());
		}
		// for (Destination destination : Destination.values()) {
		// temp.put(destination.name(), destination.getType());
		// }
		return new ObjectMapper().writeValueAsString(temp);
	}
}
