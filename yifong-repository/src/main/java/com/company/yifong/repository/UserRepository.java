package com.company.yifong.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.company.yifong.entity.UserInfo;

public interface UserRepository extends JpaRepository<UserInfo, Long> {
	UserInfo findByAccount(String username);
}
