package com.company.yifong.service;

import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;

import com.company.yifong.domain.request.CompanyRequest;
import com.company.yifong.entity.Client;

@Transactional
public interface CompanyService {

	Page<Client> findClient(Client client);

	Client edit(CompanyRequest req);

	Client save(CompanyRequest req);

	String delete(String id);

	// NOTE NEW
	Page<Client> findClient(CompanyRequest client);

	Client findOnlyOneByClient(CompanyRequest vo);

}
