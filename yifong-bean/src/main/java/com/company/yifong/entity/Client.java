package com.company.yifong.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "client")
public class Client implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false)
	private int seq;

	@Column(nullable = false, length = 45)
	private String address;

	@Column(name = "full_name", nullable = false, length = 45)
	private String fullName;

	@Column(name = "gui_number", length = 8)
	private String guiNumber;

	@Column(length=255)
	private String memo;

	@Column(nullable = false, length = 5)
	private String no;

	@Column(nullable = false, length = 45)
	private String phone;

	@Column(name = "short_name", nullable = false, length = 5)
	private String shortName;

	@Column(name = "create_time", insertable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date createTime;

	@Column(name = "update_time")
	private Date updateTime;

	@JsonManagedReference
	@OneToMany(mappedBy = "client", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Charge> charges;
	
}