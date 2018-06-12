package com.company.yifong.service;

import org.springframework.data.domain.Page;

import com.company.yifong.entity.Company;
import com.company.yifong.entity.CompanyDetail;

public interface CompanyService {

	Company save(Company company);

	Page<Company> findByCondition(Company company);

	CompanyDetail findDetailById(CompanyDetail companyDetail);

	Page<Company> findDetailById(String id);

}
