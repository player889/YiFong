package com.company.yifong.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.company.yifong.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	User findByAccount(String username);
}
