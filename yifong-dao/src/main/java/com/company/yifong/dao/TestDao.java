package com.company.yifong.dao;

import org.springframework.stereotype.Repository;

@Repository
public class TestDao {

	private static String dao = "dao";

	public String getFromDaoLayer() {
		return dao;
	}
}
