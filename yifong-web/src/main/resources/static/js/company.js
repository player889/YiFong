function queryAll() {
	// console.log(JSON.stringify($('#form1').serializeObject()));
	doAjax('/company/findAll', $('#form1').serializeObject(), function(resp) {
		console.log(resp);
	});
}

function save() {
	doAjax('/company/save', $('#form1').serializeObject());
}

function findByCompanyId() {
	doAjax('/company/findByCompanyId', $('#form1').serializeObject(), function(resp) {
		console.table(resp);
	});
}

function findByCondition() {
	doAjax('/company/find/list', $('#form1').serializeObject(), function(resp) {
		let table = "#resultTable";
		console.log(resp);
		clearTable(table, true);
		addTableRows(table, resp.data.content);
	});
}

function addTableRows(table, data) {
	if (0 === data.length) {
		alert("無資料");
	} else {
		let html = "";
		data.forEach(function(item, index, array) {
			// let name = item.name;
			// let row = `<tr><td><a
			// th:href="@{/query/id}">${name}</a></td>></tr>`;
			html += '<a href="javascript:void(0);" onclick="doDetail(' + item.id + ')">' + item.name + '</a>';
		});
		$(table).append(html);
	}
}

function clearTable(tableId, isClear) {
	isClear && $(tableId).children().remove()
}

function doDetail(id) {
	doAjax('/company/find/' + id, {}, function(resp) {
		console.log(JSON.stringify(resp, null, '\t'));
	});
}