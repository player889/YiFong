package com.company.yifong.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.company.yifong.entity.Client;

@Repository
public interface ClientRepository  extends JpaRepository<Client, Long> {

	
	List<Client> findByNo(String no);
}
