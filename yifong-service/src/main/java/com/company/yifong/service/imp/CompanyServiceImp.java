package com.company.yifong.service.imp;

import java.lang.reflect.InvocationTargetException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
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

import com.company.yifong.domain.request.ChargesRequest;
import com.company.yifong.domain.request.ClientRequest;
import com.company.yifong.domain.request.CompanyRequest;
import com.company.yifong.entity.Charge;
import com.company.yifong.entity.Client;
import com.company.yifong.repository.ChargeRepository;
import com.company.yifong.repository.ClientRepository;
import com.company.yifong.security.exception.JpaException;
import com.company.yifong.service.CompanyService;

@Service
@Transactional(rollbackFor = Exception.class)
public class CompanyServiceImp implements CompanyService {

	@Autowired
	private ClientRepository clientRepository;

	@Autowired
	private ChargeRepository chargeRepository;

	public Page<Client> findClient(Client client) {
		// @formatter:off
		ExampleMatcher matcher = ExampleMatcher.matching()
				.withIgnoreNullValues()
				.withIgnorePaths("seq")
				.withMatcher("shortName", GenericPropertyMatchers.startsWith());
		// @formatter:on
		Example<Client> example = Example.of(client, matcher);
		Sort sort = new Sort(Direction.ASC, "no");
		Page<Client> webPage = clientRepository.findAll(example, PageRequest.of(0, 10, sort));
		return webPage;
	}

	public Client edit(CompanyRequest req) {
		try {

			// delete
			chargeRepository.removeByNo(req.getClient().getNo());

			// save
			ClientRequest clientReq = req.getClient();
			Client data = clientRepository.findByNo(clientReq.getNo()).get(0);

			data = this.dataFilter(data, req);
			clientRepository.saveAndFlush(data);

			return data;
		} catch (Exception e) {
			e.printStackTrace();
			throw new JpaException("系統發生錯誤");
		}

	}

	private Client dataFilter(Client data, CompanyRequest req) throws IllegalAccessException, InvocationTargetException {
		// cilent
		ClientRequest clientReq = req.getClient();
		BeanUtils.copyProperties(data, clientReq);
		data.setUpdateTime(new Timestamp(System.currentTimeMillis()));

		// charge
		data.setCharges(this.getChargeData(data, req.getCharges()));

		return data;
	}

	private List<Charge> getChargeData(Client client, List<ChargesRequest> charges) throws IllegalAccessException, InvocationTargetException {
		List<Charge> list = new ArrayList<>();
		for (ChargesRequest chargesRequest : charges) {
			Charge c = new Charge();
			c.setClient(client);
			BeanUtils.copyProperties(c, chargesRequest);
			list.add(c);
		}
		return list;
	}

	// charge
	// chargeServcie.update(this.getChargeData(data, req.getCharges()));

	// @Autowired
	// private CompanyDetailService compayDetailService;
	// @Autowired
	// private CompanyChargesService companyChargesService;
	// @Autowired
	// private CompanyRepository companyRepository;
	// public Company save(Company company) {
	// return companyRepository.saveAndFlush(company);
	// }
	//
	// public void edit(Company company) {
	// try {
	// compayDetailService.update(company.getCompanyDetail());
	// companyChargesService.update(company);
	// } catch (Exception e) {
	// throw new JpaException("系統發生錯誤");
	// }
	// }
	//
	// // NOTE Querydsl
	// public Page<Company> findList(Company company) {
//		// @formatter:off
//		ExampleMatcher matcher = ExampleMatcher.matching()
//				.withIgnoreNullValues()
//				.withMatcher("name", GenericPropertyMatchers.startsWith());
//		//@formatter:on
	//
	// Example<Company> example = Example.of(company, matcher);
	// Sort sort = new Sort(Direction.ASC, "name");
	// Page<Company> webPage = companyRepository.findAll(example, PageRequest.of(0, 10, sort));
	//
	// return webPage;
	// }
	//
	// public Company findDetail(String id) {
	// return companyRepository.findById(id);
	// }

}
