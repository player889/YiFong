package com.company.yifong.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.company.yifong.entity.Charge;

@Repository
public interface ChargeRepository extends JpaRepository<Charge, Long> {

	@Modifying
	@Transactional
	@Query("delete from Charge e where no = ?1")
	void removeByNo(String no);

}
