package com.company.yifong.service.imp;

import java.util.List;

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

	public List<Company> findAll() {
		return companyRepository.findAll();
	}

	public Company findByCompanyId(String companyId) {
		return companyRepository.findByCompanyId(companyId);
	}

	public List<Company> findByCompanyIdOrCompanyNameLike(String companyId, String companyName) {
		return companyRepository.findByCompanyIdOrCompanyNameLike(companyId, companyName);
	}

	public Company save(Company company) {
		return companyRepository.saveAndFlush(company);
	}

	public Page<Company> findByCondition(Company company) {
		// @formatter:off
		ExampleMatcher matcher = ExampleMatcher.matching()
				.withIgnoreNullValues()
				.withMatcher("companyName", GenericPropertyMatchers.startsWith());
		// @formatter:off
		
		Example<Company> example = Example.of(company, matcher);
		
		Sort sort = new Sort(Direction.DESC, "companyId");
		Page<Company> webPage = companyRepository.findAll(example, PageRequest.of(0, 15, sort));
		
		return webPage;
	}

}
