$.fn.extend({
	
	loadTempalte(url, data, successFn) {
		const $this = $(this);
		const succ = function (data) {
			$this.html(data);
			if (typeof successFn === "function") {
				successFn();
			}
		}
		Ajax.doPost(url, data, succ, 'html');
	},
	
	enterKey(fnc) {
		return this.each(function () {
			$(this).keypress(function (ev) {
				if ('13' == (ev.keyCode ? ev.keyCode : ev.which)) {
					fnc.call(this, ev);
				}
			})
		})
	},
	
	addValidation() {
		$(this).addClass("is-invalid");
		$(this).next('.text-danger').removeClass('hideValidator');
	},
	
	isGuiNumner() {
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

});