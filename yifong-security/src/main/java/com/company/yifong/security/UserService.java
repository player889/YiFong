package com.company.yifong.security;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import com.company.yifong.entity.Role;
import com.company.yifong.entity.UserInfo;
import com.company.yifong.repository.UserRepository;

public class UserService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserInfo userInfo = userRepository.findByAccount(username);
		Set<GrantedAuthority> grantedAuthorities = new HashSet<>();

		for (Role role : userInfo.getRoles()) {
			grantedAuthorities.add(new SimpleGrantedAuthority(role.getName()));
		}

		return new User(userInfo.getAccount(), new BCryptPasswordEncoder().encode(userInfo.getPassword()), grantedAuthorities);
	}
}
