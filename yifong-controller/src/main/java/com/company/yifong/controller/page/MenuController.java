package com.company.yifong.controller.page;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MenuController {

	@GetMapping(value = "/menu")
	public String menuPage() {
		return "menu";
	}

	@GetMapping(value = "/company")
	public String companyPage() {
		return "company/company";
	}

	@GetMapping(value = "/CY")
	public String CYPage() {
		return "CY/CY";
	}

	@GetMapping(value = "/order")
	public String orderPage() {
		return "order/order";
	}

}
