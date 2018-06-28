package com.company.yifong.service;

import org.springframework.transaction.annotation.Transactional;

import com.company.yifong.entity.CompanyDetail;

@Transactional
public interface CompanyDetailService {

	void deleteById(String id);

	void save(CompanyDetail companyDetail);
	
	void update(CompanyDetail detail);

}
