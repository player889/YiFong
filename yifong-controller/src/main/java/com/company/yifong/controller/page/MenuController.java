package com.company.yifong.controller.page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.company.yifong.repository.ClientRepository;
import com.company.yifong.repository.CyRepository;
import com.company.yifong.service.CommonService;
import com.fasterxml.jackson.core.JsonProcessingException;

@Controller
public class MenuController {

	@Autowired
	private CommonService commonService;

	@GetMapping(value = "/menu")
	public String menuPage() {
		return "menu";
	}

	@GetMapping(value = "/company")
	public String companyPage(Model model) {
		return "company/company";
	}

	@GetMapping(value = "/tcompany")
	public String tcompanyPage(Model model) {
		return "tcompany/tcompany";
	}

	@GetMapping(value = "/CY")
	public String CYPage() {
		return "CY/CY";
	}

	@GetMapping(value = "/order")
	public String orderPage(Model model) throws JsonProcessingException {
		model.addAttribute("clients", clientRepository.findAllNoAndName());
		model.addAttribute("cy", cyRepository.queryAreaAndName());
		return "order/order";
	}

	@Autowired
	private ClientRepository clientRepository;

	@Autowired
	private CyRepository cyRepository;

}
