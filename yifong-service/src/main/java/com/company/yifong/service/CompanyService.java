package com.company.yifong.service;

import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;

import com.company.yifong.entity.Client;
import com.company.yifong.entity.Company;

@Transactional
public interface CompanyService {

	Company save(Company company);

	void edit(Company company);

	Page<Company> findList(Company company);

	Company findDetail(String id);

	Page<Client> findClient(Client client);

}
