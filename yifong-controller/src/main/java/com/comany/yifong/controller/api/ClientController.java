package com.comany.yifong.controller.api;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.company.yifong.domain.DataTableResponse;
import com.company.yifong.domain.request.Client;
import com.company.yifong.service.CompanyService;

@RestController
@RequestMapping("/content/client")
public class ClientController {

	@Autowired
	private CompanyService companyService;

	@PostMapping(value = "", produces = "application/json; charset=utf-8")
	public ModelAndView tcompanyPage(Model model) {
		return new ModelAndView("/content/client :: content");
	}

	@PostMapping(value = "/init", produces = "application/json; charset=utf-8")
	public DataTableResponse initAll(@RequestBody Client client) throws IOException {
		return new DataTableResponse(companyService.findClients(client));
	}
}
