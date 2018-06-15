package com.company.yifong.service;

import org.springframework.data.domain.Page;

import com.company.yifong.entity.Company;

public interface CompanyService {

	Company save(Company company);

	Page<Company> findList(Company company);

	Company findDetail(String id);

	void delete(Company company);

}
