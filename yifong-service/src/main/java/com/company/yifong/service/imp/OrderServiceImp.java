package com.company.yifong.service.imp;

import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.company.yifong.entity.Charge;
import com.company.yifong.entity.Client;
import com.company.yifong.repository.ClientRepository;
import com.company.yifong.service.OrderService;

/**
 * @author Jay
 *
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class OrderServiceImp implements OrderService {

	@Autowired
	private ClientRepository ClientRepository;

	public List<Charge> queryCharges(String no) {
		Client c = ClientRepository.findByNo(no).get(0);
		List<Charge> charges = c.getCharges();
		if (CollectionUtils.isEmpty(charges)) {
			return null;
		}
		return charges;
	}

}
