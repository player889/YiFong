package com.company.yifong.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.company.yifong.entity.Cy;

@Repository
public interface CyRepository extends JpaRepository<Cy, Long> {

	List<Cy> findByAreaOrderByUsedDesc(String no);

	Long countByNo(String no);

	@Modifying
	@Transactional
	@Query("update Cy set used = ?2, no = ?3, name = ?4, address = ?5, phone = ?6 where seq = ?1")
	void updateUsedBySeq(Integer seq, Integer used, String no, String name, String address, String phone);

	@Modifying
	@Transactional
	void removeByNo(String no);

	@Query("select NEW MAP(o.name, c.no, c.name, c.area) from Cy c left join Other o on c.area = o.code where c.used = '1' order by cast(c.area as int) asc, c.no asc")
	List<Cy> queryAreaAndName();

}
