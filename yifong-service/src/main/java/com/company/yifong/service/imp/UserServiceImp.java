package com.company.yifong.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.yifong.entity.User;
import com.company.yifong.repository.UserRepository;
import com.company.yifong.service.UserService;

@Service
public class UserServiceImp implements UserService {

	@Autowired
	private UserRepository userRepository;

	public void save(User UserInfo) {
		UserInfo.setPassword(UserInfo.getPassword());
		UserInfo.setRole(UserInfo.getRole());
		userRepository.save(UserInfo);
	}

	@Override
	public User findByAccount(String username) {
		return userRepository.findByAccount(username);
	}

}
