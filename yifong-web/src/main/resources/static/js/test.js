function query() {
	console.log(JSON.stringify($('#form1').serializeObject()));
	alert("AAA");
	doAjax('/ajaxTest', $('#form1').serializeObject());
}