package com.company.yifong.repository;

import java.util.List;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.company.yifong.entity.Company;
import com.company.yifong.entity.CompanyDetail;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

//	Company findById(String companyId);
//
//	List<Company> findByIdOrNameLike(String companyId, String companName);
//
//	Page<CompanyDetail> findAll(Example<CompanyDetail> example, PageRequest of);

}
