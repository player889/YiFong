package com.company.yifong.service;

import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;

import com.company.yifong.domain.request.CompanyRequest;
import com.company.yifong.entity.Client;

@Transactional
public interface CompanyService {

//	Company save(Company company);
//
//	Page<Company> findList(Company company);
//
//	Company findDetail(String id);

	Page<Client> findClient(Client client);
	
	Client edit(CompanyRequest req);

}
