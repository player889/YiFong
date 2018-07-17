package com.comany.yifong.controller.api;

import java.lang.reflect.InvocationTargetException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.company.yifong.domain.request.CompanyRequest;
import com.company.yifong.entity.Client;
import com.company.yifong.service.CompanyService;

@RestController
@RequestMapping("/tcompany")
public class tcompanyController {

	@Autowired
	private CompanyService companyService;

	@PostMapping(value = "/tt", produces = "application/json; charset=utf-8")
	public ModelAndView findClient(@RequestBody CompanyRequest vo, Model model) throws IllegalAccessException, InvocationTargetException {
		model.addAttribute("clients", companyService.findClient(vo).getContent());
		return new ModelAndView("/tcompany/template :: clients");
	}

	@PostMapping(value = "/model/{type}", produces = "application/json; charset=utf-8")
	public ModelAndView editModal(final @PathVariable String type, @RequestBody CompanyRequest vo, Model model) throws IllegalAccessException, InvocationTargetException {
		System.out.println("XXXXXXXXX");
		System.err.println(type);
		Client client = companyService.findOnlyOneByClient(vo);
		model.addAttribute("client", client);
		model.addAttribute("charges", client.getCharges());
		model.addAttribute("type", type);
		return new ModelAndView("/tcompany/template :: model");
	}

}
