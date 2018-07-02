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
import org.springframework.transaction.annotation.Transactional;

import com.company.yifong.entity.Client;
import com.company.yifong.entity.Company;
import com.company.yifong.repository.ClientRepository;
import com.company.yifong.repository.CompanyRepository;
import com.company.yifong.security.exception.JpaException;
import com.company.yifong.service.CompanyChargesService;
import com.company.yifong.service.CompanyDetailService;
import com.company.yifong.service.CompanyService;

@Service
@Transactional(rollbackFor = Exception.class)
public class CompanyServiceImp implements CompanyService {

	@Autowired
	private CompanyDetailService compayDetailService;

	@Autowired
	private CompanyChargesService companyChargesService;

	@Autowired
	private CompanyRepository companyRepository;

	@Autowired
	private ClientRepository clientRepository;

	public Company save(Company company) {
		return companyRepository.saveAndFlush(company);
	}

	@Transactional(rollbackFor = Exception.class)
	public void edit(Company company) {
		try {
			compayDetailService.update(company.getCompanyDetail());
			companyChargesService.update(company);
		} catch (Exception e) {
			throw new JpaException("系統發生錯誤");
		}
	}

	// NOTE Querydsl
	public Page<Company> findList(Company company) {
		// @formatter:off
		ExampleMatcher matcher = ExampleMatcher.matching()
				.withIgnoreNullValues()
				.withMatcher("name", GenericPropertyMatchers.startsWith());
		//@formatter:on

		Example<Company> example = Example.of(company, matcher);
		Sort sort = new Sort(Direction.ASC, "name");
		Page<Company> webPage = companyRepository.findAll(example, PageRequest.of(0, 10, sort));

		return webPage;
	}

	// NOTE Querydsl
	public Page<Client> findClient(Client client) {
		ExampleMatcher matcher = ExampleMatcher.matching().withIgnorePaths("seq");
		Example<Client> example = Example.of(client, matcher);
		Sort sort = new Sort(Direction.ASC, "no");
		Page<Client> webPage = clientRepository.findAll(example, PageRequest.of(0, 10, sort));
		System.out.println(webPage.getContent().get(0).toString());
		return webPage;
	}

	public Company findDetail(String id) {
		return companyRepository.findById(id);
	}

}
