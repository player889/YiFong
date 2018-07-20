class Utils {

	constructor() {
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
			position: 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter or center.
			onOpening: function () {},
			onClosing: function () {}
		});

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
				main.doAlert("error", "系統錯誤");
			}
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
	
	toPage(urlPath){
		$('#content').loadTempalte(urlPath);
	}

	doPost(url, data, successFn, dataType = 'json') {

		var header = $("meta[name='_csrf_header']").attr("content");
		var token = $("meta[name='_csrf']").attr("content");

		$.ajax({
			url: url,
			type: 'POST',
			contentType: 'application/json; charset=utf-8',
			dataType: dataType,
			data: JSON.stringify(data),
			success: function (resp) {
				if ('html' == dataType) {
					if (-1 < resp.indexOf("\{\"code\"\:")) {
						resp = JSON.parse(resp);
						main.doAlert("error", resp.message, resp.data);
					} else {
						successFn(resp);
					}
				} else {
					if (!resp.code.startsWith("S")) {
						main.doAlert("error", resp.message, resp.data);
					} else {
						main.doAlert("success", resp.message);
						if (typeof successFn === "function") {
							successFn(resp);
						}
					}
				}
			}
		});
	}

	doAlert(text, bgColor) {
		Toastify({
			text: text,
			duration: 1500,
			newWindow: true,
			close: false,
			gravity: "top",
			positionLeft: false,
			backgroundColor: bgColor,
		}).showToast();
	}
}