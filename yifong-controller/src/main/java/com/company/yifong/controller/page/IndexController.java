package com.company.yifong.controller.page;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

	@GetMapping(value = "/menu")
	public String menuPage() {
		return "menu";
	}

}
