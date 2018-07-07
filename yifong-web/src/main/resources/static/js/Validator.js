class Validator {

	constructor() {}

	reset() {
		$('.is-invalid').each(function () {
			$(this).removeClass("is-invalid");
			$(this).next('.text-danger').addClass('hideValidator');
		});
	}
	isInvalidRequired(formId) {
		let self = this;
		$('.required').each(function () {
			let $this = $(this);
			if (commonUtils.isEmpty($this.val())) {
				$this.addValidation();
			}
		});
	}
	isInValideGuiNumber() {
		let $this = $('#form3-companyDetail\\[guiNumber\\]');
		if (false === $this.isGuiNumner()) {
			$this.addValidation();
		}
	}
}

var validator = new Validator();
