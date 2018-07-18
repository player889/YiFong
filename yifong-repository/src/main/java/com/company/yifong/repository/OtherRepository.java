package com.company.yifong.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.company.yifong.entity.Other;


@Repository
public interface OtherRepository extends JpaRepository<Other, Long> {
	@Query("select NEW MAP(o.code, o.name) from Other o where o.group = 1 and o.used = 1 order by o.order asc")
	List<Map<String, String>> QueryAllDestination();

}
