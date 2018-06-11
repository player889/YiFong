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
	doAjax('/company/findByCondition', $('#form1').serializeObject(), function(resp) {
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
			let name = item.companyDetail.name;
			let phone = item.companyDetail.phone;
			let row = `<tr><td>${name}</td><td>${phone}</td></tr>`;
			html += row;
		});
		$(table).append(html);
	}
}

function clearTable(tableId, isClear) {
	isClear && $(tableId).children().remove()
}