package com.company.yifong.service;

import com.company.yifong.entity.User;

public interface UserService {

	void save(User user);

	User findByAccount(String username);
}
