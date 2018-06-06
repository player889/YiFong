package com.company.yifong.service.imp;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.company.yifong.entity.UserInfo;
import com.company.yifong.repository.UserRepository;

public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		System.out.println("XXXXXXXXXXXx");
		UserInfo userInfo = userRepository.findByAccount(username);
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority("USER"));
		return new User(userInfo.getAccount(), userInfo.getPassword(), authorities);
	}

	// @Transactional(readOnly = true)
	// public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	//
	// System.out.println("XX : " + username);
	//
	// UserInfo user = userRepository.findByAccount(username);
	//
	// Set<GrantedAuthority> grantedAuthorities = new HashSet<GrantedAuthority>();
	// for (Role role : user.getRoles()) {
	// grantedAuthorities.add(new SimpleGrantedAuthority(role.getName()));
	// }
	//
	// return new org.springframework.security.core.userdetails.User(user.getAccount(), user.getPassword(), grantedAuthorities);

	// /*Here we are using dummy data, you need to load user data from
	// database or other third party application*/
	// User user = findUserbyUername(username);
	//
	// UserBuilder builder = null;
	// if (user != null) {
	// builder = org.springframework.security.core.userdetails.User.withUsername(username);
	// builder.password(new BCryptPasswordEncoder().encode(user.getPassword()));
	// builder.roles(user.getRoles());
	// } else {
	// throw new UsernameNotFoundException("User not found.");
	// }
	//
	// return builder.build();
	// }

}
