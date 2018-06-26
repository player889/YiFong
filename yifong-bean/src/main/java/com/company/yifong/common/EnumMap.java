package com.company.yifong.common;

import java.util.LinkedHashMap;
import java.util.Map;

import com.company.yifong.enums.Destination;
import com.fasterxml.jackson.core.JsonProcessingException;

public class EnumMap {

	public static Map<String, Object> getDestination() throws JsonProcessingException {
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		for (Destination destination : Destination.values()) {
			map.put(destination.getType(), size());
		}
		return map;
	}

	private static Map<String, Object> size() {
		Map<String, Object> map = new LinkedHashMap<String, Object>();
		map.put("1", true);
		map.put("2", true);
		map.put("3", true);
		return map;
	}
}
