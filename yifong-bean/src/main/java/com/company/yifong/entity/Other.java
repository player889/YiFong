package com.company.yifong.entity;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name = "other")
public class Other implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false)
	private int seq;

	@Column(nullable = false)
	private int code;

	@Column(nullable = false, length = 45)
	private String group;

	@Column(nullable = false)
	private byte used;

	@Column(nullable = false, length = 45)
	private String name;

	@Column(nullable = false)
	private int order;

	public Other() {
	}

	public Other(int code, String name) {
		super();
		this.name = name;
		this.code = code;
	}

	public int getSeq() {
		return this.seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

	public int getCode() {
		return this.code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getGroup() {
		return this.group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	public byte getUsed() {
		return used;
	}

	public void setUsed(byte used) {
		this.used = used;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getOrder() {
		return this.order;
	}

	public void setOrder(int order) {
		this.order = order;
	}

}