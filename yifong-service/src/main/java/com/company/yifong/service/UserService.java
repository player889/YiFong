package com.company.yifong.service;

import com.company.yifong.entity.UserInfo;

public interface UserService {

	void save(UserInfo user);

	UserInfo findByAccount(String username);
}
