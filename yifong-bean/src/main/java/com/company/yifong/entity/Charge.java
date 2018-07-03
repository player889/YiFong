package com.company.yifong.entity;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "charge")

public class Charge implements Serializable {
	private static final long serialVersionUID = 1L;

	@JsonIgnore
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false)
	private int seq;

	@Column(nullable = false, length = 20)
	// @Enumerated(EnumType.ORDINAL)
	private String dest;

	private int fee;

	private int os;

	private int pay;

	@Column(nullable = false)
	private int size;

	@Column(name = "create_time", insertable = false, updatable = false)
	private Date createTime;

	@Column(name = "update_time")
	private Timestamp updateTime;

	@JsonBackReference
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "no", referencedColumnName = "no", nullable = false)
	private Client client;

}