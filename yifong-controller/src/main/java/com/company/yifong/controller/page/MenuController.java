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
	
	
//	@GetMapping(value = "/company/list")
//	public String companyListPage(Map<String, Object> model) {
//		model.put("list", this.getMock());
//		return "company/companyList";
//	}
//	private List<Client> getMock() {
//		List<Client> list = new ArrayList<Client>();
//		Client c = new Client();
//		c.setNo("7");
//		c.setFullName("ABC");
//		list.add(c);
//
//		Client b = new Client();
//		b.setNo("7");
//		b.setFullName("ABC");
//		list.add(b);
//		
//		
//		Client c2 = new Client();
//		c2.setNo("7");
//		c2.setFullName("ABC");
//		list.add(c2);
//
//		Client b3 = new Client();
//		b3.setNo("7");
//		b3.setFullName("ABC");
//		list.add(b3);
//		
//		Client c4 = new Client();
//		c4.setNo("7");
//		c4.setFullName("ABC");
//		list.add(c4);
//
//		Client b5 = new Client();
//		b5.setNo("7");
//		b5.setFullName("ABC");
//		list.add(b5);
//		
//		return list;
//	}

}
