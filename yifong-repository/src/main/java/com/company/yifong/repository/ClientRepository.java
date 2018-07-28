package com.company.yifong.repository;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.company.yifong.entity.Client;

@Repository
@Transactional
public interface ClientRepository extends JpaRepository<Client, Long> {

	List<Client> findByNo(String no);

	void removeByNo(String no);

	@Query("select NEW MAP(no, shortName) from Client  c order by cast(c.no as int) asc")
	List<Map<String, String>> findAllNoAndName();
	
	List<Client> findByShortNameStartingWith(String shortName);

}
