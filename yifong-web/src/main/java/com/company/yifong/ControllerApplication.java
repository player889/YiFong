package com.company.yifong;

import org.springframework.boot.Banner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = { "com.company.yifong", "com.comany.yifong.security", "com.comany.yifong.repository", "com.comany.yifong.exception", "com.comany.yifong.controller", "com.comany.yifong.service", "com.comany.yifong.dao", "com.company.yifong.commonuitls" })
// @EnableAutoConfiguration(exclude = { DataSourceAutoConfiguration.class }) // NOTE Stop initial database setting
@EnableJpaRepositories("com.company.yifong.repository")
public class ControllerApplication extends SpringBootServletInitializer {
	@Override
	protected SpringApplicationBuilder configure(final SpringApplicationBuilder application) {
		return application.sources(ControllerApplication.class);
	}

	public static void main(final String[] args) {
		new SpringApplicationBuilder().bannerMode(Banner.Mode.OFF).sources(ControllerApplication.class).run(args);
	}
}
