package com.company.yifong.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.company.yifong.entity.CompanyCharge;

@Repository
public interface CompanyChargeRepository extends JpaRepository<CompanyCharge, Long> {

	CompanyCharge findByCompanyId(String id);

	@Modifying
	@Transactional
	void removeByCompanyId(String id);

	Long countByCompanyId(String id);

}
