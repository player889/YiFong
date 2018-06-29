let fn = {
	initData: {
		defaultDestination: [],
		defaultSize: ['20呎', '40呎', "20/40呎"]
	},
	init: function () {

		doAjax('/common/destination/', {}, function (resp) {
			fn.initData.defaultDestination = resp.data;
		});

		$("#input").enterKey(function (e) {
			e.preventDefault();
			query(false);
		});

		$('#editModal').on('hidden.bs.modal', function (e) {
			$('#form3-companyCharges').empty();
		});

	},
	getDestinationDDL: function (val) {
		val = (null === val || Number.isInteger(val)) ? val : fn.getDestinationIndex(val);
		return fn.addTd(commonUtils.createOptions('form3-companyCharges[destinationCode]', fn.initData.defaultDestination, val));
	},
	getSizeDDL: function (val) {
		return fn.addTd(commonUtils.createOptions('form3-companyCharges[size]', fn.initData.defaultSize, val));
	},
	getTxtInputHTML: function (name, value, isMoneyForm) {
		let currency = (true === isMoneyForm) ? ' currency' : '';
		let html = `<input type="text" class="form-control ${currency}" name="${name}" value="${value}" />`;
		return fn.addTd((true === isMoneyForm) ? fn.moenySign(html) : html);
	},
	moenySign: function (val) {
		return `<div class="input-group"><div class="input-group-prepend"><span class="input-group-text"><img src="images/dollar.png" width="20" height="20"></span></div>${val}</div>`;
	},
	getDestinationIndex: function (key) {
		return fn.initData.defaultDestination.indexOf(key);
	},
	phoneFilter: function (val) {
		let icon = commonUtils.getSkypIcon();
		let arr = val.split("-");
		if (3 === arr.length) {
			return arr[0] + arr[1] + icon + '分機' + arr[2];
		}
		return val + icon;
	},
	addTd: function (html) {
		return '<td>' + html + '</td>';
	},
	addChargeRowHTML: function (charges) {
		let html = ``;
		for (let {
			size: size,
			destinationCode: ds,
			pay: pay,
			fee: fee,
			outsourcing: os
		}
			of charges) {

			html += fn.getChargeHTML(size, ds, pay, fee, os);
		}
		return html;
	},
	addEmptyRow: function () {
		$('#form3-companyCharges tr:last').before(fn.getChargeHTML(null, null, 0, 0, 0));
		$('.currency').number(true, 0);
	},
	getChargeHTML: function (size, ds, pay, fee, os) {

		let destinationDDL = fn.getDestinationDDL(ds);
		let sizeDDL = fn.getSizeDDL(size);
		let payTxtInput = fn.getTxtInputHTML("form3-companyCharges[pay]", pay, true);
		let feeTxtInput = fn.getTxtInputHTML("form3-companyCharges[fee]", fee, true);
		let osTxtInput = fn.getTxtInputHTML('form3-companyCharges[outsourcing]', os, true);

		return `<tr>${destinationDDL}${sizeDDL}${payTxtInput}${feeTxtInput}${osTxtInput}</tr>`;
	},
	hasSameJsonInJsonArray: function (JSON) {
		let isSame = false;
		let len = JSON.length;
		for (let i = 0; i <= len - 1 && !isSame; i++) {
			for (let j = i + 1; j <= len - 1 && !isSame; j++) {
				isSame = _.isEqual(JSON[i], JSON[j]);
			}
		}
		return isSame;
	},
	defaultChargeTable: function (charges) {
		let chargeRow = $.isEmptyObject(charges) ? `` : fn.addChargeRowHTML(charges);
		let html = ``;
		html += ` <table class="table table-sm">`;
		html += ` <thead><tr> <th scope="col" style="width:15%">地點</th> <th scope="col" style="width:20%">櫃子呎吋</th> <th scope="col">應收費用</th> <th scope="col">司機運費</th> <th scope="col">外調費用</th> </tr></thead>`;
		html += ` <tbody>`;
		html += `${chargeRow}`;
		html += `<tr><td><input type="button" class="btn btn-outline-success" value="新增運費" onclick="fn.addEmptyRow();" /></td></tr>`;
		html += `</tbody></table>`;
		return html;
	}
};

fn.init();

function getQueryData() {

	let data = $('#input').val();

	let vo = {};
	if (/^\d+$/.test(data)) {
		vo.id = data;
	} else if (data) {
		vo.name = data;
	}

	return vo;
}

function query() {

	$('#form2').empty();

	let data = getQueryData();
	// if ($.isEmptyObject(data)) {
	// alert("請輸入資料");
	// return;
	// }


	doAjax('/company/find/list', data, function (resp) {

		let data = resp.data.content;
		if ($.isEmptyObject(data)) {
			alert("無資料");
		} else {
			let html = companyInfoHTML(data);
			$('#form2').append(html);
		}
	});
}

function companyInfoHTML(data) {
	let show = (0 === data.length - 1) ? 'show active' : '';
	return listHTML(data, show) + infoHTML(data, show);
}

function listHTML(data, show) {
	let html = ``;
	html += `<div class="row" id="content">`;
	html += `<div class="col-2">`;
	html += `	<div class="list-group" id="companyList" role="tablist">`;

	let index = 0;
	for (let {
		id: id,
		name: name
	}
		of data) {
		html += `<a class="list-group-item list-group-item-action ${show}" href="#info_${index}" role="tab" data-toggle="list" id="infoList_${index}">${id} ${name}</a>`;
		index++;
	}

	html += `	</div>`;
	html += `</div>`;
	return html;
}

function infoHTML(data, show) {

	let index = 0;
	let html = ``;
	html += `<div class="col-10 scrollBar">`;
	html += `	<div class="tab-content">`;

	for (let {
		companyDetail: {
			id: id,
			name: name,
			address: address,
			phone: ph,
			guiNumber: gn,
			memo: me
		},
		companyCharges: charges
	}
		of data) {

		let phone = fn.phoneFilter(ph);
		let guiNumber = commonUtils.getValue(gn);
		let memo = commonUtils.getValue(me);
		let chargeHTML = (true === $.isEmptyObject(charges)) ? `` : getViewChargeHTML(charges);

		html += `	<div class="tab-pane fade ${show}" id="info_${index}" role="tabpanel" aria-labelledby="infoList_${index}">`;
		html += `		<div class="card">`;
		html += `			<div class="card-body">`;
		html += ` 				<input type="button" class="btn btn-outline-warning float-right" value="修改" onclick="doEditModal('${id}');"/>`;
		html += `${name}<br>${address}<br>${phone}<br>${guiNumber}<br>${memo}`;
		html += `${chargeHTML}`;
		html += `			</div>`;
		html += `		</div>`;
		html += `	</div>`;

		index++;
	}

	html += `	</div>`;
	html += `</div>`;

	return html;
};

function getViewChargeHTML(charges) {

	let html = ``;

	html += ` <table class="table table-sm table-condensed">`;
	html += ` <thead><tr><th scope="col" style="width:15%">地點</th> <th scope="col" style="width:20%">櫃子呎吋</th>  <th scope="col">應收費用</th> <th scope="col">司機運費</th> <th scope="col">外調費用</th> </tr></thead>`;
	html += ` <tbody>`;
	for (let {
		size: size,
		destinationCode: ds,
		pay: pay,
		fee: fee,
		outsourcing: os
	}
		of charges) {
		let si = fn.initData.defaultSize[size];
		html += `<tr><td>${ds}</td><td>${si}</td><td>${pay}</td><td>${fee}</td><td>${os}</td></tr>`;
	}

	html += `</tbody></table>`;
	return html;
};

function doEditModal(id) {
	doAjax('/company/find/' + id, {}, function (resp) {
		let detail = resp.data.companyDetail;
		$('#form3-id').val(detail.id);
		$('#form3-name').val(resp.data.name);
		$('#form3-companyDetail\\[name\\]').val(detail.name);
		$('#form3-companyDetail\\[phone\\]').val(detail.phone);
		$('#form3-companyDetail\\[guiNumber\\]').val(detail.guiNumber);
		$('#form3-companyDetail\\[address\\]').val(detail.address);
		$('#form3-companyDetail\\[memo\\]').val(detail.memo);
		$('#form3-companyCharges').append(fn.defaultChargeTable(resp.data.companyCharges));
		$("#editModal").modal();
		$('.currency').number(true, 0);
	});
};

function doEdit() {

	let JSON = getEditData();
	if (false === JSON) {
		alert("重複運費設定，請確認!");
		return;
	}

	if (true === confirm("是否確定更改資料")) {
		doAjax('/company/edit', JSON, function (data) {
			alert(data.message);
			query();
		});
	}

};

function getEditData() {

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

		if (commonUtils.isNotEmptyNum(pay) || (commonUtils.isNotEmptyNum(fee) && commonUtils.isNotEmptyNum(os))) {
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

	if (fn.hasSameJsonInJsonArray(JSON.companyCharges)) {
		return false;
	}

	return JSON;
};

function doSave() {

	// // let id = $('#form3 input[name="id"]').val();
	// let extraData = {
	// companyDetail : {
	// id : id
	// }
	// };
	// doAjax('/company/save', '#form3', function(data) {
	// $('#form1 input[name="id"]').val(id);
	// query(true);
	// alert(data.message);
	// }, extraData); }
};
