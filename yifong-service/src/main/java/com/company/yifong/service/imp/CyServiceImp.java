package com.company.yifong.service.imp;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.company.yifong.domain.request.CyRequest;
import com.company.yifong.entity.Cy;
import com.company.yifong.repository.CyRepository;
import com.company.yifong.service.CyService;

@Service
@Transactional(rollbackFor = Exception.class)
public class CyServiceImp implements CyService {

	@Autowired
	private CyRepository cyRepository;

	public List<Cy> query(CyRequest vo) {
		if (StringUtils.isNotBlank(vo.getName())) {
			return cyRepository.findByNameContaining(vo.getName());
		}
		return cyRepository.findByArea(vo.getArea());
	}

}
