$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

var doAjax = function(url, data, successFn) {

	var header = $("meta[name='_csrf_header']").attr("content");
	var token = $("meta[name='_csrf']").attr("content");

	$.ajax({
		url : url,
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		dataType : 'json',
		data : JSON.stringify(data),
		beforeSend : function(xhr) {
			xhr.setRequestHeader(header, token);
		},
		success : function(data) {
			if (!data.code.startsWith("S")) {
				alert("!" + data.message);
			} else {
				if (typeof successFn === "function") {
					successFn(data);
				} else {
					alert(data.message);
				}

			}
		},
		error : function(jqXHR, exception) {
			if (200 != jqXHR.status) {
				alert("系統錯誤");
			}
		}
	});

}
