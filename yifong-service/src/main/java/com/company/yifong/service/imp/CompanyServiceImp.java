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
import com.company.yifong.entity.CompanyDetail;
import com.company.yifong.repository.CompanyDetailRepository;
import com.company.yifong.repository.CompanyRepository;
import com.company.yifong.service.CompanyService;

@Service
public class CompanyServiceImp implements CompanyService {

	@Autowired
	private CompanyRepository companyRepository;

	@Autowired
	private CompanyDetailRepository companyDetailRepository;

	public Company save(Company company) {
		return companyRepository.saveAndFlush(company);
	}

	public Page<Company> findByCondition(Company company) {
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
	

	@Override
	public CompanyDetail findDetailById(CompanyDetail companyDetail) {
		return companyDetailRepository.findById(companyDetail.getId());
	}
	
	public Page<CompanyDetail> findTest(CompanyDetail companyDetail) {
		
		System.out.println("XXXXXXXXXXXXXXXXXX");
		// @formatter:off
		ExampleMatcher matcher = ExampleMatcher.matching();
		// @formatter:off
		
		Example<CompanyDetail> example = Example.of(companyDetail, matcher);

		Sort sort = new Sort(Direction.ASC, "id");
		Page<CompanyDetail> webPage = companyDetailRepository.findAll(example, PageRequest.of(0, 10, sort));
		
		return webPage;
	}


}
