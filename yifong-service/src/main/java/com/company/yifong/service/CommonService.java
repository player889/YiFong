package com.company.yifong.service;

import java.util.List;

import com.company.yifong.entity.Other;
import com.company.yifong.enums.DDL;

public interface CommonService {

	List<Other> getDDL(DDL ddl);

}