package com.company.yifong.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.company.yifong.entity.Cy;

@Repository
public interface CyRepository extends JpaRepository<Cy, Long> {

	List<Cy> findByArea(String no);

	List<Cy> findByNameContaining(String name);

}
