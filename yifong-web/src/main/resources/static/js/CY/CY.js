class CY extends CYTemplate {
	constructor() {
		super();

		let data = ["基隆關", "暖暖關", "六堵關", "五堵關", "桃園關", "新竹關", "台中關", "高雄關"];
		$("#CYArea").append(commonUtils.createOptions("area", data, '', 8));

		$('#editModal').on('show.bs.modal', function (event) {
			let button = $(event.relatedTarget);

			let no = button.data('no');
			let name = button.data('name');
			let address = button.data('address');
			let phone = button.data('phone');
			let used = button.data('used');

			$('#used').prop('checked', (used == true) ? 'checked' : '')
			$('#used').next("label").html('<h4>' + name + '</h4>');
			$('#edit-address').val(address);
			$('#edit-phone').val(phone);
			$('#edit-name').val(name);
		});

		$("#name").enterKey(function (e) {
			e.preventDefault();
			cy.query();
		});

	}

	query() {
		let data = {
			area: $('select[name="area"]').val(),
			name: $('#name').val()
		}

		commonUtils.doAjax('/CY/query', data, function (resp) {
			$('#content > tbody').empty();
			let html = cy.createRow(resp.data);
			$('#content > tbody:last-child').append(html);
		});
	}

}

var cy = new CY();