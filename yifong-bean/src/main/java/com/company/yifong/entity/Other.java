package com.company.yifong.entity;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the others database table.
 * 
 */
@Entity
@Table(name="others")
@NamedQuery(name="Other.findAll", query="SELECT o FROM Other o")
public class Other implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(unique=true, nullable=false)
	private int destCode;

	@Column(nullable=false, length=10)
	private String destName;

	@Column(nullable=false, length=3)
	private String group;

	@Column(nullable=false)
	private int order;

	@Column(nullable=false)
	private int seq;

	public Other() {
	}

	public int getDestCode() {
		return this.destCode;
	}

	public void setDestCode(int destCode) {
		this.destCode = destCode;
	}

	public String getDestName() {
		return this.destName;
	}

	public void setDestName(String destName) {
		this.destName = destName;
	}

	public String getGroup() {
		return this.group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	public int getOrder() {
		return this.order;
	}

	public void setOrder(int order) {
		this.order = order;
	}

	public int getSeq() {
		return this.seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

}