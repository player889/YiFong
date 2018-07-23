package com.comany.yifong.controller.api;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/content")
public class ClientController {

	@PostMapping(value = "/client", produces = "application/json; charset=utf-8")
	public ModelAndView tcompanyPage(Model model) {
		return new ModelAndView("/content/client :: content");
	}
}
