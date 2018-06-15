package com.company.yifong.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.company.yifong.entity.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

	Company findById(String id);

	@Modifying
	@Transactional
	void removeById(String id);

}
