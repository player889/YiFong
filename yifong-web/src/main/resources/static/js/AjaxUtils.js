class AjaxUtils {

	constructor() {
		$(document).ajaxSend(function (event, jqxhr, settings) {
			var header = $("meta[name='_csrf_header']").attr("content");
			var token = $("meta[name='_csrf']").attr("content");
			jqxhr.setRequestHeader(header, token);
			$('body').loading('start');
		});

		$(document).ajaxComplete(function (event, jqxhr, settings) {
			$('body').loading('stop');
		});

		$(document).ajaxError(function (event, jqxhr, settings, thrownError) {
			if (200 != jqxhr.status) {
				commonUtils.doAlert("error", "系統錯誤");
			}
		});
	}

	doPost(url, data, successFn, dataType = 'json') {

		var header = $("meta[name='_csrf_header']").attr("content");
		var token = $("meta[name='_csrf']").attr("content");

		$.ajax({
			url: url,
			type: 'POST',
			contentType: 'application/json; charset=utf-8',
			dataType: dataType,
			data: (typeof data === 'object') ? JSON.stringify(data) : JSON.stringify($(data).serializeJSON(serializeSettings)),
			success: function (resp) {
				if('html' == dataType){
					if(-1 < resp.indexOf("\{\"code\"\:") ){
						resp = JSON.parse(resp);
						commonUtils.doAlert("error", resp.message, resp.data);
					}else{
						successFn(resp);
					}
				}else{
					if (!resp.code.startsWith("S")) {
						commonUtils.doAlert("error", resp.message, resp.data);
					} else {
						commonUtils.doAlert("success", resp.message);
						if (typeof successFn === "function") {
							successFn(resp);
						}
					}
				}
			}
		});
	}

};

const Ajax = new AjaxUtils();