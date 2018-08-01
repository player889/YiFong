package com.comany.yifong.controller.api;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.company.yifong.domain.BootstrapTable;
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
	public BootstrapTable initAll(@RequestBody Client client) throws IOException {

		BootstrapTable bt = new BootstrapTable();
		DataTableResponse data = companyService.initClients(client);

		bt.setRows(data.getData());
		bt.setTotal(data.getRecordsTotal());
	
		
		return bt;
	}

	@PostMapping(value = "/query", produces = "application/json; charset=utf-8")
	public DataTableResponse queryClients(@RequestBody Client client) throws IOException {
		return companyService.findClients(client);
	}
}
