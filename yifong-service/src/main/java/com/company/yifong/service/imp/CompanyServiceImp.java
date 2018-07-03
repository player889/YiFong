package com.company.yifong.service.imp;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
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
		ExampleMatcher matcher = ExampleMatcher.matching().withIgnorePaths("seq");
		Example<Client> example = Example.of(client, matcher);
		Sort sort = new Sort(Direction.ASC, "no");
		Page<Client> webPage = clientRepository.findAll(example, PageRequest.of(0, 10, sort));
		return webPage;
	}

	public void edit(CompanyRequest req) {
		try {

			// delete
			chargeRepository.removeByNo(req.getClient().getNo());

			// client
			ClientRequest clientReq = req.getClient();
			Client data = clientRepository.findByNo(clientReq.getNo()).get(0);
			this.setClient(data, req);
			clientRepository.saveAndFlush(data);

		} catch (Exception e) {
			e.printStackTrace();
			throw new JpaException("系統發生錯誤");
		}
	}

	private void setClient(Client data, CompanyRequest req) {
		ClientRequest clientReq = req.getClient();
		data.setAddress(clientReq.getAddress());
		data.setFullName(clientReq.getFullName());
		data.setGuiNumber(clientReq.getGuiNumber());
		data.setMemo(clientReq.getMemo());
		data.setPhone(clientReq.getPhone());
		data.setShortName(clientReq.getShortName());
		data.setUpdateTime(new Timestamp(System.currentTimeMillis()));
		// charge
		data.setCharges(this.getChargeData(data, req.getCharges()));
	}

	private List<Charge> getChargeData(Client client, List<ChargesRequest> charges) {
		List<Charge> list = new ArrayList<>();
		for (ChargesRequest chargesRequest : charges) {
			Charge c = new Charge();
			c.setClient(client);
			c.setDest(chargesRequest.getDest());
			c.setFee(Integer.parseInt(chargesRequest.getFee()));
			c.setOs(Integer.parseInt(chargesRequest.getOs()));
			c.setPay(Integer.parseInt(chargesRequest.getPay()));
			c.setSize(Integer.parseInt(chargesRequest.getSize()));
			c.setUpdateTime(chargesRequest.getUpdateDate());
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
