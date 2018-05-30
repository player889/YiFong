package com.comany.yifong.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.company.yifong.service.HelloServiceImp;

@Controller
public class HelloController {

	@Autowired
	private HelloServiceImp service;

	@RequestMapping(value = "/api", method = RequestMethod.GET)
	@ResponseBody
	public String helloWorld() {
		return "Hello World!!";
	}

	@GetMapping("/service")
	@ResponseBody
	public String serviceLayer() {
		return service.getFromService();
	}

}
