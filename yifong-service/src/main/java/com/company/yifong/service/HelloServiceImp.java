package com.company.yifong.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.yifong.dao.TestDao;

@Service
public class HelloServiceImp {

	@Autowired
	private TestDao dao;

	public String getFromService() {
		return "service layer work " + "XXX" + dao.getFromDaoLayer();
	}

}
