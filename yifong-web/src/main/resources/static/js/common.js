var $loading = $('#loadingDiv').hide();
$(document)
.ajaxStart(function () {
	$loading.show();
})
.ajaxStop(function () {
	$loading.hide();
});

class CommonUtils {

	constructor() {
		$.fn.enterKey = function (fnc) {
			return this.each(function () {
				$(this).keypress(function (ev) {
					var keycode = (ev.keyCode ? ev.keyCode : ev.which);
					if (keycode == '13') {
						fnc.call(this, ev);
					}
				})
			})
		}
	}

	isEmpty(val){
		return 0 === val.length ? true : false;
	}
	getValue(val) {
		return (undefined === val) ? '' : val;
	}
	getSkypIcon() {
		return '<a href="skype:echo123?call"><img src="images/skype.png" width="20" height="20"/></a>';
	}
	toCurrency(str) { //NOTE delete?
		return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	isEmptyNum(val) {
		return ('' === val || 0 === parseInt(val)) ? true : false;
	}
	isEmptyObject(val) {
		return (undefined === val || null === val || '' === val || isNaN(val)) ? true : false;
	}
	createOptions(name, data, val = undefined) {
		return $('<select/>', {
			'class': 'form-control',
			'name': name
		}).html($.map(data, function (text, index) {
			return $('<option/>', {
				'value': index,
				'text': text,
				'selected': (commonUtils.isEmptyObject(val) || index != val) ? false : true,
				'disabled': (commonUtils.isEmptyObject(val) || index === val) ? false : true
			});
		})).prop("outerHTML");
	}
	doAjax(url, data, successFn, extraData) {

		var serializeSettings = {
			parseNumbers: true,
			skipFalsyValuesForTypes: ["string", "number"],
			parseWithFunction: function (val, inputName) {
				return ("" === val || 0 === val) ? null : val;
			}
		};

		var header = $("meta[name='_csrf_header']").attr("content");
		var token = $("meta[name='_csrf']").attr("content");

		$.ajax({
			url: url,
			type: 'POST',
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			data: (typeof data === 'object') ? JSON.stringify(data) : JSON.stringify($(data).serializeJSON(serializeSettings)),
			beforeSend: function (xhr, settings) {

				xhr.setRequestHeader(header, token);

				//NOTE delete?
				if (false === $.isEmptyObject(extraData)) {
					settings.data = JSON.parse(settings.data);
					let key = Object.keys(extraData)[0];
					let json = (undefined === settings.data[key]) ? settings.data : settings.data[key];
					_.extend(json, extraData[key]);
					settings.data = JSON.stringify(settings.data);
				}

			},
			success: function (data) {
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
			error: function (jqXHR, exception) {
				if (200 != jqXHR.status) {
					alert("系統錯誤");
				}
			}
		});
	}
	doModal(url, data, contentId) {

		var header = $("meta[name='_csrf_header']").attr("content");
		var token = $("meta[name='_csrf']").attr("content");

		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'html',
			data: JSON.stringify(data),
			contentType: "application/json",
			beforeSend: function (xhr, settings) {
				xhr.setRequestHeader(header, token);
			},
			success: function (data) {
				$(contentId).html(data);
			}
		});
	}
}

let commonUtils = new CommonUtils();
//NOTE
//function allFalse(data) {
//let result = true;
//for ( let i in data) {
//if (data[i] === true) {
//result = false;
//break;
//}
//}
//return result
//}
