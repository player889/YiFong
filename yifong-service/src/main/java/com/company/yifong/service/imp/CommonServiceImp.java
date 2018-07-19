package com.company.yifong.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.yifong.entity.Other;
import com.company.yifong.enums.DDL;
import com.company.yifong.repository.OtherRepository;
import com.company.yifong.service.CommonService;

@Service
public class CommonServiceImp implements CommonService {

	@Autowired
	private OtherRepository otherRepository;

	public List<Other> getDDL(DDL ddl) {
		return otherRepository.getDDL(ddl.getGroup());
	}

}
