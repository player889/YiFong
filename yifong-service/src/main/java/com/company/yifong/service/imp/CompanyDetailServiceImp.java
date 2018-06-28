package com.company.yifong.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.company.yifong.entity.CompanyDetail;
import com.company.yifong.repository.CompanyDetailRepository;
import com.company.yifong.service.CompanyDetailService;

@Service
@Transactional(rollbackFor = Exception.class)
public class CompanyDetailServiceImp implements CompanyDetailService {

	@Autowired
	private CompanyDetailRepository companyDetailRepository;

	public void update(CompanyDetail detail) {

		String id = detail.getId();
		String name = detail.getName();
		String phone = detail.getPhone();
		String address = detail.getAddress();
		String gui_number = detail.getGuiNumber();
		String momo = detail.getMemo();

		companyDetailRepository.updateAllById(id, name, phone, address, gui_number, momo);
	}

	public void deleteById(String id) {
		companyDetailRepository.removeById(id);
	}

	public void save(CompanyDetail companyDetail) {
		companyDetailRepository.save(companyDetail);
	}

}
