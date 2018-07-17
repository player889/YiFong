class CommonUtils {

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
		// NOTE
// <a href="callto://+***********">Link will initiate Skype to call my number!</a>
// <a href="tel://+1234567890">Call Me</a>
		return '<a href="skype:+1234567890?call">Call Me</a>'; 
// return '<a href="skype:echo123?call"><img src="images/skype_PNG23.png" width="20" height="20" class="align-middle"/></a>';
	}
	isEmptyNum(val) {
		return ('' === val || 0 === parseInt(val)) ? true : false;
	}
	isEmptyObject(val) {
		return (undefined === val || null === val || '' === val || isNaN(val)) ? true : false;
	}
	createOptions(name, data, val = undefined, size = 7,defaultTitle = '', clazz = '') {
		return $('<select/>', {
			'class': 'form-control selectpicker' + clazz,
			'data-size': size,
			'name': name,
			'title': ('' === defaultTitle) ?  '' : defaultTitle 
		}).html($.map(data, function (text, index) {
				return $('<option/>', {
					'value': index,
					'text': text,
					'selected': (commonUtils.isEmptyObject(val) || index != val) ? false : true,
					'disabled': (commonUtils.isEmptyObject(val) || index === val) ? false : true
				});
			})).prop("outerHTML");
	}
	doAjax(url, data, successFn) {
		Ajax.doPost(url,data,successFn);
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
}

let commonUtils = new CommonUtils();