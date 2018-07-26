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

import com.company.yifong.domain.DataTableResponse;
import com.company.yifong.domain.request.ChargesRequest;
import com.company.yifong.domain.request.ClientRequest;
import com.company.yifong.domain.request.CompanyRequest;
import com.company.yifong.entity.Charge;
import com.company.yifong.entity.Client;
import com.company.yifong.repository.ChargeRepository;
import com.company.yifong.repository.ClientRepository;
import com.company.yifong.security.exception.DataNotFoundException;
import com.company.yifong.security.exception.InputException;
import com.company.yifong.security.exception.JpaException;
import com.company.yifong.service.CompanyService;
import com.fasterxml.jackson.core.JsonProcessingException;

@Service
@Transactional(rollbackFor = Exception.class)
public class CompanyServiceImp implements CompanyService {

	@Autowired
	private ClientRepository clientRepository;

	public DataTableResponse findClients(com.company.yifong.domain.request.Client client) throws JsonProcessingException {

		Client entity = new Client();
		if ("".equals(client.getShortName().trim())) {
			entity.setShortName(client.getShortName());
		}

		// @formatter:off
		ExampleMatcher matcher = ExampleMatcher.matching()
				.withIgnoreNullValues()
				.withIgnorePaths("seq")
				.withMatcher("shortName", GenericPropertyMatchers.startsWith());
		// @formatter:on
		Example<Client> example = Example.of(entity, matcher);
		Sort sort = new Sort(Direction.ASC, "no");
		Page<Client> webPage = clientRepository.findAll(example, PageRequest.of(client.getStart() - 1, client.getLength(), sort));

		int total = (int) clientRepository.count();

		return new DataTableResponse(client.getDraw(), webPage, total);
	}

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

	public Client findOnlyOneByClient(CompanyRequest vo) {
		List<Client> clients = clientRepository.findByNo(vo.getClient().getNo());
		if (1 != clients.size()) {
			throw new JpaException("資料發生錯誤");
		}
		return clients.get(0);
	}

	public Page<Client> findClient(CompanyRequest vo) {
		Client client = new Client();
		client.setShortName(vo.getClient().getShortName());
		// @formatter:off
		ExampleMatcher matcher = ExampleMatcher.matching()
				.withIgnoreNullValues()
				.withIgnorePaths("seq")
				.withMatcher("shortName", GenericPropertyMatchers.startsWith());
		// @formatter:on
		Example<Client> example = Example.of(client, matcher);
		Sort sort = new Sort(Direction.ASC, "no");
		Page<Client> webPage = clientRepository.findAll(example, PageRequest.of(0, 10, sort));

		if (webPage.getContent().isEmpty()) {
			throw new DataNotFoundException();
		}

		return webPage;
	}

	public Client save(CompanyRequest req) {
		if (isExist(req.getClient().getNo())) {
			throw new InputException("代號已被使用，請重新輸入。");
		}
		Client data = new Client();
		try {
			// client
			BeanUtils.copyProperties(data, req.getClient());
			// charge
			data.setCharges(this.getChargeData(data, req.getCharges()));
			// save
			clientRepository.saveAndFlush(data);
		} catch (Exception e) {
			throw new JpaException();
		}
		return data;
	}

	public Client edit(CompanyRequest req) {
		try {

			// delete
			chargeRepository.removeByNo(req.getClient().getNo());

			ClientRequest clientReq = req.getClient();
			Client data = clientRepository.findByNo(clientReq.getNo()).get(0);

			data = this.dataFilter(data, req);
			// save
			clientRepository.saveAndFlush(data);

			return data;
		} catch (Exception e) {
			e.printStackTrace();
			throw new JpaException();
		}

	}

	public String delete(String no) {
		List<Client> data = clientRepository.findByNo(no);
		if (0 == data.size()) {
			throw new DataNotFoundException("無資料");
		} else if (1 < data.size()) {
			throw new JpaException();
		} else {
			clientRepository.removeByNo(no);
		}
		return no;
	}

	private boolean isExist(String no) {
		List<Client> list = clientRepository.findByNo(no);
		return (null == list || 0 == list.size()) ? false : true;
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

}
