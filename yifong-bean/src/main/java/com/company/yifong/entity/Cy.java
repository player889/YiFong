package com.company.yifong.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "cy")
public class Cy implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false, insertable = false, updatable = false)
	private int seq;

	@Column(nullable = true, length = 100)
	private String address;

	@Column(nullable = false)
	private String area;

	@Column(nullable = false, length = 45)
	private String name;

	@Column(nullable = false, length = 5)
	private String no;

	@Column(nullable = false, length = 15)
	private String phone;

	@Column(nullable = false, columnDefinition = "TINYINT", length = 1)
	private Integer used;

}