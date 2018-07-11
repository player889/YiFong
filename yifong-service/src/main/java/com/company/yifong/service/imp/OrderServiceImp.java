package com.company.yifong.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.company.yifong.entity.Client;
import com.company.yifong.repository.ClientRepository;
import com.company.yifong.service.OrderService;

@Service
@Transactional(rollbackFor = Exception.class)
public class OrderServiceImp implements OrderService {

	@Autowired
	private ClientRepository ClientRepository;

	@Override
	public List<Client> queryClientNoAndNames() {
		return ClientRepository.findAllNoAndName();
	}

}
