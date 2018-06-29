class Company extends companyTemplate{

	constructor() {
		super();
		this._CNTRSize = ['20呎', '40呎', "20/40呎"];
		this.initData();
		this.initEvent();
		
	}
	initData() {
		let self = this;
		commonUtils.doAjax('/common/destination/', {}, function (resp) {
			self._dest = resp.data;
		});
	}
	initEvent() {
		$("#input").enterKey(function (e) {
			e.preventDefault();
			c.query(false);
		});

		$('#editModal').on('hidden.bs.modal', function (e) {
			$('#form3-companyCharges').empty();
		});
	}
	phoneFilter(val) {
		let icon = commonUtils.getSkypIcon();
		let arr = val.split("-");
		return (3 === arr.length) ? arr[0] + arr[1] + icon + '分機' + arr[2] :  val + icon;
	}
	addEmptyRow() {
		$('#form3-companyCharges tr:last').before(super.getChargeContentHTML());
		$('.currency').number(true, 0);
	}
	hasSameJsonInJsonArray(JSON) {
		let isSame = false;
		let len = JSON.length;
		for (let i = 0; i <= len - 1 && !isSame; i++) {
			for (let j = i + 1; j <= len - 1 && !isSame; j++) {
				isSame = _.isEqual(JSON[i], JSON[j]);
			}
		}
		return isSame;
	}
	getQueryData() {
		let data = $('#input').val();
		let vo = {};
		if (/^\d+$/.test(data)) {
			vo.id = data;
		} else if (data) {
			vo.name = data;
		}
		return vo;
	}
	companyInfoHTML(data) {
		return super.getCompanyInformation(data);
	}
	query() {
		$('#form2').empty();

		let data = this.getQueryData();
		// if ($.isEmptyObject(data)) {
		// alert("請輸入資料");
		// return;
		// }

		let self = this;
		commonUtils.doAjax('/company/find/list', data, function (resp) {

			let data = resp.data.content;
			if ($.isEmptyObject(data)) {
				alert("無資料");
			} else {
				let html = self.companyInfoHTML(data);
				$('#form2').append(html);
			}
		});
	}
	
	doEditModal(id) {
		let self = this;
		commonUtils.doAjax('/company/find/' + id, {}, function (resp) {
			let detail = resp.data.companyDetail;
			$('#form3-id').val(detail.id);
			$('#form3-name').val(resp.data.name);
			$('#form3-companyDetail\\[name\\]').val(detail.name);
			$('#form3-companyDetail\\[phone\\]').val(detail.phone);
			$('#form3-companyDetail\\[guiNumber\\]').val(detail.guiNumber);
			$('#form3-companyDetail\\[address\\]').val(detail.address);
			$('#form3-companyDetail\\[memo\\]').val(detail.memo);
			$('#form3-companyCharges').append(self.getEditChargeContentHTML(resp.data.companyCharges));
			$("#editModal").modal();
			$('.currency').number(true, 0);
		});
	}
	doEdit() {
		let JSON = this.getEditData();
		if (false === JSON) {
			alert("重複運費設定，請確認!");
			return;
		}

		if (true === confirm("是否確定更改資料")) {
			let self = this;
			commonUtils.doAjax('/company/edit', JSON, function (data) {
				alert(data.message);
				self.query();
			});
		}
	}
	getEditData() {
		let JSON = {
			id: $('#form3-id').val(),
			name: $('#form3-name').val(),
			companyCharges: [],
			companyDetail: {
				id: $('#form3-id').val(),
				name: $('#form3-name').val(),
				phone: $('#form3-companyDetail\\[phone\\]').val(),
				address: $('#form3-companyDetail\\[address\\]').val(),
				guiNumber: $('#form3-companyDetail\\[guiNumber\\]').val(),
				memo: $('#form3-companyDetail\\[memo\\]').val()
			}
		};

		let row = $('[name="form3-companyCharges\\[destinationCode\\]"]');

		$.each(row, function (index, dom) {
			let size = $('[name="form3-companyCharges\\[size\\]"]').eq(index).val();
			let pay = $('[name="form3-companyCharges\\[pay\\]"]').eq(index).val();
			let fee = $('[name="form3-companyCharges\\[fee\\]"]').eq(index).val();
			let os = $('[name="form3-companyCharges\\[outsourcing\\]"]').eq(index).val();

			if (commonUtils.isEmptyNum(pay) || (commonUtils.isEmptyNum(fee) && commonUtils.isEmptyNum(os))) {
				return true;
			} else {
				let obj = {
					destinationCode: $(this).val(),
					size: size,
					pay: pay,
					fee: fee,
					outsourcing: os
				};
				JSON.companyCharges.push(obj);
			}
		});

		if (this.hasSameJsonInJsonArray(JSON.companyCharges)) {
			return false;
		}

		return JSON;
	}
	doSave() {}

}
let c = new Company();