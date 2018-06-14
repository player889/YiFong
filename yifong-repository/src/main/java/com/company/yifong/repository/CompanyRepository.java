package com.company.yifong.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.company.yifong.entity.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

	Company findById(String id);

	Company findByIdOrNameLike(String id , String name);
	
	// List<Company> findByIdOrNameLike(String companyId, String companName);
	//
	// Page<CompanyDetail> findAll(Example<CompanyDetail> example, PageRequest of);

}
