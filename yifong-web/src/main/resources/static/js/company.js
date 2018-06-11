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
		console.table(resp);
	});
}