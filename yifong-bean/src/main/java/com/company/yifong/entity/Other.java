package com.company.yifong.entity;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The persistent class for the other database table.
 * 
 */
@Entity
@Table(name = "other")
public class Other implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false)
	private int seq;

	@Column(nullable = false, length = 5)
	private String code;

	@Column(nullable = false, length = 45)
	private String group;

	@Column(nullable = false, length = 45)
	private String name;

	public Other() {
	}

	public int getSeq() {
		return this.seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

	public String getCode() {
		return this.code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getGroup() {
		return this.group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

}