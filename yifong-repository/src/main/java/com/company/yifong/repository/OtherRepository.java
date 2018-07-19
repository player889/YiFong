package com.company.yifong.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.company.yifong.entity.Other;

@Repository
public interface OtherRepository extends JpaRepository<Other, Long> {

	@Query("select new Other(o.code, o.name) from Other o where o.group = :group and o.used = 1 order by o.order asc")
	List<Other> getDDL(final @Param("group") String group);

}
