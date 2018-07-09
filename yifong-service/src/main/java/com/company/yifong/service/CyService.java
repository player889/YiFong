package com.company.yifong.service;

import java.util.List;

import com.company.yifong.domain.request.CyRequest;
import com.company.yifong.entity.Cy;

public interface CyService {

	List<Cy> query(CyRequest vo);

	void edit(CyRequest vo);
}
