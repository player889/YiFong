// package com.comany.yifong.auth.config;
//
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//
// @Configuration
// public class AuthConfig extends WebSecurityConfigurerAdapter {
//
// @Override
// protected void configure(final HttpSecurity http) throws Exception {
// // System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!");
// // System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!");
// // System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!");
// //
// // http
// // .authorizeRequests()
// // .antMatchers("/**").authenticated()
// // .antMatchers("/**").permitAll();
//
// // http
// // // 禁用CSRF保护
// // .csrf().disable()
// // .authorizeRequests()
// // // 任何访问都必须授权
// // .anyRequest().fullyAuthenticated()
// // // 配置那些路径可以不用权限访问
// // .mvcMatchers("/login").permitAll()
// // .and()
// // .formLogin()
// // // 登陆成功后的处理，因为是API的形式所以不用跳转页面
// // .successHandler(new RestAuthenticationSuccessHandler())
// // // 登陆失败后的处理
// // .failureHandler(new SimpleUrlAuthenticationFailureHandler())
// // .and()
// // // 登出后的处理
// // .logout().logoutSuccessHandler(new RestLogoutSuccessHandler())
// // .and()
// // // 认证不通过后的处理
// // .exceptionHandling()
// // .authenticationEntryPoint(new RestAuthenticationEntryPoint());
// }
//
// }