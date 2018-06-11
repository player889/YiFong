package com.company.yifong.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
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

	public List<Company> findByCondition(Company company) {
		// NOTE
		// ExampleMatcher matcher = ExampleMatcher.matching().withIgnorePaths("lastname").withIncludeNullValues().withStringMatcherEnding();
		// ExampleMatcher matcher = ExampleMatcher.matching()
		// .withMatcher("firstname", endsWith())
		// .withMatcher("lastname", startsWith().ignoreCase());
		// }
		return companyRepository.findAll(Example.of(company));
	}

}
