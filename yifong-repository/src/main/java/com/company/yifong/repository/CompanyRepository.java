package com.company.yifong.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.company.yifong.entity.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {

	Company findByCompanyId(String companyId);

	List<Company> findByCompanyIdOrCompanyNameLike(String companyId, String companName);

}
