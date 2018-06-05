package com.company.yifong;

import org.springframework.boot.Banner;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = { "com.company.yifong", "com.comany.yifong.security", "com.comany.yifong.repository", "com.comany.yifong.exception", "com.comany.yifong.controller", "com.comany.yifong.service", "com.comany.yifong.dao" })
// Stop initial database setting
@EnableAutoConfiguration(exclude = { DataSourceAutoConfiguration.class })
public class ControllerApplication extends SpringBootServletInitializer {
	@Override
	protected SpringApplicationBuilder configure(final SpringApplicationBuilder application) {
		return application.sources(ControllerApplication.class);
	}

	public static void main(final String[] args) {
		new SpringApplicationBuilder().bannerMode(Banner.Mode.OFF).sources(ControllerApplication.class).run(args);
	}
}
