package com.company.yifong.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.company.yifong.entity.CompanyDetail;

@Repository
@Transactional(rollbackFor = Exception.class)
public interface CompanyDetailRepository extends JpaRepository<CompanyDetail, Long> {

	CompanyDetail findById(String id);

	void removeById(String id);

	@Modifying(clearAutomatically = true)
	@Query("update CompanyDetail set name = :name, phone=:phone,address=:address,gui_number=:gui_number, memo=:momo where id = :id ")
	void updateAllById(@Param("id") String id, @Param("name") String name, @Param("phone") String phone, @Param("address") String address, @Param("gui_number") String gui_number, @Param("momo") String momo);

}
