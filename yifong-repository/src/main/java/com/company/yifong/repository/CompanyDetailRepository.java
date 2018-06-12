package com.company.yifong.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.company.yifong.entity.CompanyDetail;

@Repository
public interface CompanyDetailRepository extends JpaRepository<CompanyDetail, Long> {
	
	CompanyDetail findById(String id);

}
