package com.company.yifong.service;

import java.util.List;

import com.company.yifong.entity.Charge;

public interface OrderService {

	/**
	 * use in order
	 * 
	 * @param no
	 * @return
	 */
	List<Charge> queryCharges(String no);
}