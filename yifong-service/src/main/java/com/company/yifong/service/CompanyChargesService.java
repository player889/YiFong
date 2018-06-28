package com.company.yifong.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.company.yifong.entity.Company;
import com.company.yifong.entity.CompanyCharge;

@Transactional
public interface CompanyChargesService {

	List<CompanyCharge> save(List<CompanyCharge> detail);

	void update(Company company);

	void deleteById(Company company);

}
