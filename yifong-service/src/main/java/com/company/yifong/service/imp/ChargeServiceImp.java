package com.company.yifong.service.imp;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.company.yifong.entity.Charge;
import com.company.yifong.service.ChargeService;

@Service
public class ChargeServiceImp implements ChargeService {

	// @Autowired
	// private ObjectMapper objectMapper;
	//
	// @Autowired
	// private ChargeRepository chargeRepository;

	@Transactional
	public void delete(String no) {
//		chargeRepository.removeByNo(no);
	}

	@Override
	@Transactional
	public void update(List<Charge> charge) {
//		chargeRepository.saveAll(charge);
	}

}
