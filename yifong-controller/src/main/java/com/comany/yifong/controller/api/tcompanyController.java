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
import com.company.yifong.enums.DDL;
import com.company.yifong.service.CommonService;
import com.company.yifong.service.CompanyService;

@RestController
@RequestMapping("/tcompany")
public class tcompanyController {

	@Autowired
	private CommonService commonService;

	@Autowired
	private CompanyService companyService;

	@PostMapping(value = "/tt", produces = "application/json; charset=utf-8")
	public ModelAndView findClient(@RequestBody CompanyRequest vo, Model model) throws IllegalAccessException, InvocationTargetException {
		model.addAttribute("sizeDDL", commonService.getDDL(DDL.CONTAINER_SIZE));
		model.addAttribute("destDDL", commonService.getDDL(DDL.CHARGE_DESTINATION));
		model.addAttribute("clients", companyService.findClient(vo).getContent());
		return new ModelAndView("/tcompany/template :: clients");
	}

	@PostMapping(value = "/model/{type}", produces = "application/json; charset=utf-8")
	public ModelAndView editModal(final @PathVariable String type, @RequestBody CompanyRequest vo, Model model) throws IllegalAccessException, InvocationTargetException {
		model.addAttribute("type", type);
		model.addAttribute("client", companyService.findOnlyOneByClient(vo));
		return new ModelAndView("/tcompany/template :: model");
	}

}
