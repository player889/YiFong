package com.company.yifong.service.imp;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.yifong.entity.Role;
import com.company.yifong.entity.UserInfo;
import com.company.yifong.repository.RoleRepository;
import com.company.yifong.repository.UserRepository;
import com.company.yifong.service.UserService;

@Service
public class UserServiceImp implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;

	public void save(UserInfo UserInfo) {
		UserInfo.setPassword(UserInfo.getPassword());
		UserInfo.setRoles(new HashSet<Role>(roleRepository.findAll()));
		userRepository.save(UserInfo);
	}

	@Override
	public UserInfo findByAccount(String username) {
		return userRepository.findByAccount(username);
	}

}
