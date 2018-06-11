package com.company.yifong.service;

import java.util.List;

import com.company.yifong.entity.Company;

public interface CompanyService {

	List<Company> findAll();

	Company findByCompanyId(String companyId);

	Company save(Company company);

	List<Company> findByCompanyIdOrCompanyNameLike(String companyId, String companyName);

	List<Company> findByCondition(Company company);

}
