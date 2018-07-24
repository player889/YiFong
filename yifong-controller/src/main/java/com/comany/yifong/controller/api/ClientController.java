package com.comany.yifong.controller.api;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.company.yifong.domain.AjaxResponse;
import com.company.yifong.domain.DataTable;
import com.company.yifong.domain.request.ClientRequest;
import com.company.yifong.domain.request.Client_S;
import com.company.yifong.domain.request.CompanyRequest;
import com.company.yifong.domain.status.ApiSatus;
import com.company.yifong.entity.Client;
import com.company.yifong.service.CompanyService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/content/client")
public class ClientController {

	@Autowired
	private CompanyService companyService;

	@Autowired
	private ObjectMapper objectMapper;

	@PostMapping(value = "", produces = "application/json; charset=utf-8")
	public ModelAndView tcompanyPage(Model model) {
		return new ModelAndView("/content/client :: content");
	}

	@PostMapping(value = "/init", produces = "application/json; charset=utf-8")
	public DataTable initAll(@RequestBody Client_S data) throws IOException {
//		public DataTable initAll(@RequestBody JsonNode data) throws IOException {
//System.out.println("XXXXXXXXXXXXXXXX");
//{
//	"draw": 1,
//	"columns": [{
//			"data": "shortName",
//			"name": "",
//			"searchable": true,
//			"orderable": false,
//			"search": {
//				"value": "",
//				"regex": false
//			}
//		}
//	],
//	"order": [],
//	"start": 0,
//	"length": 10,
//	"search": {
//		"value": "",
//		"regex": false
//	}
//}
		ObjectMapper mapper = new ObjectMapper();
		System.out.println(mapper.writeValueAsString(data));
		JsonNode root = mapper.readTree(mapper.writeValueAsString(data));
//		int start = root.path("start").asInt();
//		int draw = root.path("draw").asInt();
//		int length = root.path("length").asInt();
//		String column = "";
//		String columnValue = "";
//		JsonNode contactNode = root.path("columns");
//		for (JsonNode node : contactNode) {
//			String columnName = node.path("data").asText();
//			JsonNode searchNode = node.path("search");
//			String searchVal = searchNode.path("value").asText();
//			if (!searchVal.isEmpty()) {
//				column = columnName;
//				columnValue = searchVal;
//			}
//		}

		System.out.println("xxxxxxxxxxxxxxxxxxxxx");
		System.out.println("xxxxxxxxxxxxxxxxxxxxx");
		System.out.println("xxxxxxxxxxxxxxxxxxxxx");
		System.out.println("@@@@@");
		// System.out.println(vo.getShortName());
		Client client = new Client();
		Page<Client> result = companyService.findClient(client);
		System.out.println(objectMapper.writeValueAsString(result));

		DataTable dataTable = new DataTable();
		dataTable.setDraw(1);
		dataTable.setData(result.getContent());
		dataTable.setRecordsFiltered(Integer.parseInt(String.valueOf(result.getTotalElements())));
		dataTable.setRecordsTotal(result.getTotalPages());

		return dataTable;
		// return new AjaxResponse(ApiSatus.SUCC_QUERY, dataTable);
	}
}
