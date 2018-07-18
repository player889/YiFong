package com.company.yifong.service.imp;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.yifong.repository.OtherRepository;
import com.company.yifong.service.CommonService;

@Service
public class CommonServiceImp implements CommonService {

	@Autowired
	private OtherRepository otherRepository;

	public List<Map<String, String>> findAllDestination() {
		List<Map<String, String>> map = null;
		try {
			map = otherRepository.QueryAllDestination();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}

}
