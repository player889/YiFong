package com.company.yifong.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.company.yifong.entity.Company;
import com.company.yifong.repository.CompanyRepository;
import com.company.yifong.service.CompanyService;

@Service
public class CompanyServiceImp implements CompanyService {

	@Autowired
	private CompanyRepository companyRepository;

	public Company save(Company company) {
		return companyRepository.saveAndFlush(company);
	}

	// NOTE Querydsl

	public Page<Company> findList(Company company) {

		// @formatter:off
		ExampleMatcher matcher = ExampleMatcher.matching()
				.withIgnoreNullValues()
				.withMatcher("name", GenericPropertyMatchers.startsWith());
		// @formatter:off
		
		Example<Company> example = Example.of(company, matcher);
		
		Sort sort = new Sort(Direction.ASC, "id");
		Page<Company> webPage = companyRepository.findAll(example, PageRequest.of(0, 10, sort));
		
		return webPage;
	}
	
	public Company findDetail(String id) {
		return 	companyRepository.findById(id);
	}
	
	public void delete(Company company) {
//		companyRepository.findB
		companyRepository.removeById(company.getId());
	}

}
