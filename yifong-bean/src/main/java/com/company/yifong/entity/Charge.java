package com.company.yifong.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "charge")
@NamedQuery(name = "Charge.findAll", query = "SELECT c FROM Charge c")

public class Charge implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false)
	private int seq;

	private String dest;

	private int fee;

	private int os;

	private int pay;

	@Column(nullable = false)
	private int size;

	@Column(name = "create_time", nullable = false)
	private Date createTime;

	@Column(name = "update_time")
	private Date updateTime;

	@JsonBackReference
	@ManyToOne
	@JoinColumn(name = "no", referencedColumnName = "no", nullable = false)
	private Client client;

}