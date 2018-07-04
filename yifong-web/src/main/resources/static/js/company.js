class Company extends companyTemplate {

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
	setTempData(json) {
		this._tempData = json;
	}
	getTempData(index) {
		return this._tempData[index];
	}
	initEvent() {
		$("#input").enterKey(function (e) {
			e.preventDefault();
			c.query();
		});

		$('#editModal').on('hidden.bs.modal', function (e) {
			$('#form3-companycharges').empty();
		});
	}
	phoneFilter(val) {
		let icon = commonUtils.getSkypIcon();
		let arr = val.split("-");
		return (3 === arr.length) ? arr[0] + arr[1] + icon + '分機' + arr[2] : val + icon;
	}
	addEmptyRow() {
		$('#form3-companycharges tr:last').before(super.getchargesContentHTML());
		$('.currency').number(true, 0);
	}
	hasSamecharges(JSON) {
		let tmp = [];
		$.each(tmp, function (index, item) {
			tmp.push({
				dest: item.dest,
				size: item.size
			});
		});
		let isSame = false;
		let len = tmp.length;
		for (let i = 0; i <= len - 1 && !isSame; i++) {
			for (let j = i + 1; j <= len - 1 && !isSame; j++) {
				isSame = _.isEqual(tmp[i], tmp[j]);
			}
		}
		return isSame;
	}
	query(showHrefIndex) {
		let data = {
			client: {}
		};
		let inputs = $('#input').val();
		if (commonUtils.isEmpty(inputs)) {
			alert("請輸入資料");
			return;
		} else if (/^\d+$/.test(inputs)) {
			data.client.no = inputs;
		} else if (inputs) {
			data.client.shortName = inputs;
		}

		let self = this;
		commonUtils.doAjax('/company/find/client', data, function (resp) {
			self.querySuccCallBack(resp, showHrefIndex);
		});
	}
	querySuccCallBack(resp, showHrefIndex){
		let data = resp.data.content;
		if ($.isEmptyObject(data)) {
			alert("無資料");
		} else {
			$('#form2').empty();
			this.setTempData(data);
			showHrefIndex = (undefined === showHrefIndex) ?  (1 === data.length) ? 0 : -1 : showHrefIndex
			$('#form2').append(this.getCompanyInformation(data, showHrefIndex));
		}
	}
	
	doEditModal(index) {
		let data = this.getTempData(index);
		$('#form3-no').val(data.no);
		$('#form3-shortName').val(data.shortName);
		$('#form3-companyDetail\\[fullName\\]').val(data.fullName);
		$('#form3-companyDetail\\[phone\\]').val(data.phone);
		$('#form3-companyDetail\\[guiNumber\\]').val(data.guiNumber);
		$('#form3-companyDetail\\[address\\]').val(data.address);
		$('#form3-companyDetail\\[memo\\]').val(data.memo);
		$('#form3-companycharges').append(super.getEditchargesContentHTML(data.charges));
		$("#editModal").modal();
		$('.currency').number(true, 0);
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
				self.query(self.getShowHrefId());
			});
		}
	}
	getShowHrefId(){
		let index = 0;
		$('.list-group-item').each(function(){
			if($(this).hasClass("active")){
				index = $(this).prop("id").replace('infoList_','');
			}
		});
		return parseInt(index);
	}
	getEditData() {
		let JSON = {
			client: {
				no: $('#form3-no').val(),
				shortName: $('#form3-shortName').val(),
				fullName: $('#form3-companyDetail\\[fullName\\]').val(),
				phone: $('#form3-companyDetail\\[phone\\]').val(),
				address: $('#form3-companyDetail\\[address\\]').val(),
				guiNumber: $('#form3-companyDetail\\[guiNumber\\]').val(),
				memo: $('#form3-companyDetail\\[memo\\]').val(),
			},
			charges: []
		};

		let row = $('[name="form3-companycharges\\[dest\\]"]');

		$.each(row, function (index, dom) {
			let size = $('[name="form3-companycharges\\[size\\]"]').eq(index).val();
			let pay = $('[name="form3-companycharges\\[pay\\]"]').eq(index).val();
			let fee = $('[name="form3-companycharges\\[fee\\]"]').eq(index).val();
			let os = $('[name="form3-companycharges\\[os\\]"]').eq(index).val();

			if (commonUtils.isEmptyNum(fee)) {
				return true;
			} else if (commonUtils.isEmptyNum(fee) && commonUtils.isEmptyNum(fee)) {
				return true;
			} else {
				let obj = {
					dest: $(this).val(),
					size: size,
					fee: fee,
					pay: pay,
					os: os
				};
				JSON.charges.push(obj);
			}
		});

		if (this.hasSamecharges(JSON.charges)) {
			return false;
		}

		return JSON;
	}
	doSave() {}

}
let c = new Company();
