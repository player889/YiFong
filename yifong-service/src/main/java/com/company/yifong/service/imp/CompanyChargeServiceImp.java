package com.company.yifong.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.company.yifong.entity.Company;
import com.company.yifong.entity.CompanyCharge;
import com.company.yifong.repository.CompanyChargeRepository;
import com.company.yifong.service.CompanyChargesService;

@Service
@Transactional(rollbackFor = Exception.class)
public class CompanyChargeServiceImp implements CompanyChargesService {

	@Autowired
	private CompanyChargeRepository companyChargeRepository;

	public List<CompanyCharge> save(List<CompanyCharge> charge) {
		return companyChargeRepository.saveAll(charge);
	}

	public void deleteById(Company company) {
		companyChargeRepository.removeByCompanyId(company.getId());
	}

	public void update(Company company) {
		this.deleteById(company);
		this.save(company.getCompanyCharges());
	}

}
