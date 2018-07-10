class CY extends CYTemplate {
	
	constructor() {
		super();
		this.initData();
		this.initEvent();
	}
	initData(){
		this._data = ["基隆關", "暖暖關", "六堵關", "五堵關", "桃園關", "新竹關", "台中關", "高雄關"];
	}
	initEvent(){
		
		$("#CYArea").append(this.createDDL("area", this._data));
		$("#addCYArea").append(this.createDDL("add-area", this._data));
		
		$('#addModal, #deleteModal').on('show.bs.modal', function (e) {
			$('#add-area').selectpicker('val', 0);
			$('#deleteNo').val("");
		});

		$("#name").enterKey(function (e) {
			e.preventDefault();
			cy.query();
		});
	}
	query(defatulArea = $('#area').val()) {
		let data = {
			area: defatulArea
		}
		
		commonUtils.doAjax('/CY/query', data, function (resp) {
			$('#content').removeClass("d-none")
			$('#content > tbody').empty();
			let html = cy.createRow(resp.data);
			$('#content > tbody:last-child').append(html);
		});
	}
	doSave(){
		let data = {
			no: $('#add-no').val(),
			area : $('#add-area').val(),
			used: $('#add-used').prop("checked") ? 1 : 0,
			address: $('#add-address').val(),
			name: $('#add-name').val(),
			phone: $('#add-phone').val()
		}
		commonUtils.doAjax('/CY/save', data, function(resp){
			cy.query(data.area);
			$('#addModalForm')[0].reset();
			$('#add-area').selectpicker('val', 0);
			commonUtils.doAlert("success", resp.message);
		});
	}
	doEdit(index, seq) {
		let data = {
			seq: seq,
			no: $('#no' + index).val(),
			used: $('#used' + index).prop("checked") ? 1 : 0,
			address: $('#address' + index).val(),
			name: $('#name' + index).val(),
			phone: $('#phone' + index).val()
		};
		commonUtils.doAjax('/CY/edit', data);
	}
	doDelete(){
		let data = {
			no : $('#deleteNo').val()
		};
		commonUtils.doAjax('/CY/delete', data, function(resp){
			$('#deleteModal').modal('hide');
			cy.query();
			commonUtils.doAlert("success", resp.message);
		});
	}
	createDDL(id, data){
		return $('<select/>', {
			'class': 'form-control selectpicker',
			'data-size': '8',
			'id': id,
			'data-width':'auto'
		}).html($.map(data, function (text, index) {
				return $('<option/>', {
					'value': index,
					'text': text
				});
		})).prop("outerHTML");
	}
}

var cy = new CY();
