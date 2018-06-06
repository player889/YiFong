package com.company.yifong.entity;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the role database table.
 * 
 */
@Entity
@NamedQuery(name="Role.findAll", query="SELECT r FROM Role r")
public class Role implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="role_id")
	private int roleId;

	private String name;

	//bi-directional many-to-one association to UserInfo
	@ManyToOne
	@JoinColumn(name="fk_user_id")
	private UserInfo user;

	public Role() {
	}

	public int getRoleId() {
		return this.roleId;
	}

	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public UserInfo getUser() {
		return this.user;
	}

	public void setUser(UserInfo user) {
		this.user = user;
	}

}