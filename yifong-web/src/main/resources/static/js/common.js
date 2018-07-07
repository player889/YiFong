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

		$.fn.addValidation = function () {
			$(this).addClass("is-invalid");
			$(this).next('.text-danger').removeClass('hideValidator');
		}

		$.fn.isGuiNumner = function () {

			let taxId = $(this).val();

			if ('' === taxId) {
				return true;
			}

			var invalidList = "00000000,11111111";
			if (/^\d{8}$/.test(taxId) == false || invalidList.indexOf(taxId) != -1) {
				return false;
			}

			var validateOperator = [1, 2, 1, 2, 1, 2, 4, 1],
			sum = 0,
			calculate = function (product) {
				var ones = product % 10,
				tens = (product - ones) / 10;
				return ones + tens;
			};
			for (var i = 0; i < validateOperator.length; i++) {
				sum += calculate(taxId[i] * validateOperator[i]);
			}

			return sum % 10 == 0 || (taxId[6] == "7" && (sum + 1) % 10 == 0);
		}

		iziToast.settings({
			color: '', // blue, red, green, yellow
			timeout: 2000,
			resetOnHover: false,
			pauseOnHover: false,
			close: false,
			closeOnEscape: true,
			closeOnClick: true,
			icon: 'material-icons',
			transitionIn: 'fadeInLeft', // bounceInLeft, bounceInRight, bounceInUp, bounceInDown, fadeIn, fadeInDown, fadeInUp, fadeInLeft, fadeInRight or flipInX.
			transitionOut: 'fadeOutRight', // fadeOut, fadeOutUp, fadeOutDown, fadeOutLeft, fadeOutRight, flipOutX
			position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter or center.
			onOpening: function () {},
			onClosing: function () {}
		});
	}
	doAlert(type, message, title = '') {
		iziToast.show({
			title: title,
			message: message,
			color: ('info' === type) ? 'blue' : ('success' === type) ? 'green' : ('warning' === type) ? 'yellow' : ('error' === type) ? 'red' : '',
			icon: '<i class="iziToast-icon ico-' + type + ' revealIn"></i>'
		});
	}
	isEmpty(val) {
		return 0 === val.trim().length ? true : false;
	}
	getValue(val) {
		return (undefined === val) ? '' : val;
	}
	getSkypIcon() {
		return '<a href="skype:echo123?call"><img src="images/skype.png" width="20" height="20"/></a>';
	}
	isEmptyNum(val) {
		return ('' === val || 0 === parseInt(val)) ? true : false;
	}
	isEmptyObject(val) {
		return (undefined === val || null === val || '' === val || isNaN(val)) ? true : false;
	}
	createOptions(name, data, val = undefined, size = 7) {
		return $('<select/>', {
			'class': 'form-control selectpicker',
			'data-size': size,
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

		var self = this;

		var serializeSettings = {
			parseNumbers: true,
			skipFalsyValuesForTypes: ["string", "number"],
			parseWithFunction: function (val, inputName) {
				return ("" === val || 0 === val) ? null : val;
			}
		};

		var header = $("meta[name='_csrf_header']").attr("content");
		var token = $("meta[name='_csrf']").attr("content");

// self.ajaxStartLoading();

		$.ajax({
			url: url,
			type: 'POST',
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			data: (typeof data === 'object') ? JSON.stringify(data) : JSON.stringify($(data).serializeJSON(serializeSettings)),
			beforeSend: function (xhr, settings) {

				xhr.setRequestHeader(header, token);

				// NOTE delete?
				if (false === $.isEmptyObject(extraData)) {
					settings.data = JSON.parse(settings.data);
					let key = Object.keys(extraData)[0];
					let json = (undefined === settings.data[key]) ? settings.data : settings.data[key];
					_.extend(json, extraData[key]);
					settings.data = JSON.stringify(settings.data);
				}
// self.ajaxStartLoading();
			},
			success: function (resp) {
				if (!resp.code.startsWith("S")) {
					self.doAlert("error", resp.data, resp.message);
				} else {
					if (typeof successFn === "function") {
						successFn(resp);
					} else {
						self.doAlert("success", resp.message);
					}
				}
			},
			complete: function () {
// self.ajaxStartLoading();
			},
			error: function (jqXHR, exception) {
				if (200 != jqXHR.status) {
					self.doAlert("error", "系統錯誤");
				}
			}
		});
	}
	initAjaxLoading() {
		$('body').loading({
			onStart: function (loading) {
				loading.overlay.fadeIn();
			},
			onStop: function (loading) {
				loading.overlay.fadeOut();
			}
		});
	}
	ajaxStartLoading() {
		$('body').loading('start');
	}
	ajaxStopLoading() {
		$('body').loading('stop');
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
// commonUtils.initAlertUI();
// NOTE
// function allFalse(data) {
// let result = true;
// for ( let i in data) {
// if (data[i] === true) {
// result = false;
// break;
// }
// }
// return result
// }

// var message = {
// info: function (status, title, msg) {
// $('<div style="position: fixed;width: 100%;z-index: 999;" class="alert alert-' + status + '">' +
// '<a href="#" class="close" data-dismiss="alert">&times;</a>' +
// '<strong>' + title + '！</strong>' + msg +
// '</div>').prependTo($('body')).hide().slideToggle(300).delay(2000).slideToggle(300, function () {
// this.remove();
// });
// },
// success: function (msg) {
// this.info('success', '成功', msg);
// },
// error: function (msg) {
// this.info('danger', '错误', msg);
// },
// warning: function (msg) {
// this.info('warning', '警告', msg);
// }
// };
