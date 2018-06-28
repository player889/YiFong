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
	getDestinationDDL: function () {
		return commonUtils.createOptions('form3-companyCharges[destinationCode]', 'form-control', fn.initData.defaultDestination);
	},
	getSizeDDL: function (val) {
		return commonUtils.createOptions('form3-companyCharges[size]', 'form-control', fn.initData.defaultSize, val);
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

	let data = getQueryData();
	// if ($.isEmptyObject(data)) {
	// alert("請輸入資料");
	// return;
	// }

	$('#form2').empty();

	doAjax('/company/find/list', data, function (resp) {

		let data = resp.data.content;
		if ($.isEmptyObject(data)) {
			alert("無資料");
		} else {

			let show = (0 === data.length - 1) ? 'show active' : '';

			let html = ``;

			html += `<div class="row" id="content">`;
			html += `<div class="col-2">`;
			html += `	<div class="list-group" id="companyList" role="tablist">`;
			data.forEach(function (item, index, array) {
				let id = item.id;
				let name = item.name;
				html += `	<a class="list-group-item list-group-item-action ${show}" href="#info_${index}" role="tab" data-toggle="list" id="infoList_${index}">${id} ${name}</a>`;
			});
			html += `	</div>`;
			html += `</div>`;

			html += `<div class="col-10 scrollBar">`;
			html += `	<div class="tab-content">`;

			data.forEach(function (item, index, array) {
				let info = item.companyDetail;
				let id = item.id;
				let name = info.name;
				let address = info.address;
				let phone = phoneFilter(info.phone);
				let guiNumber = commonUtils.getValue(info.guiNumber);
				let memo = commonUtils.getValue(info.memo);

				html += `	<div class="tab-pane fade ${show}" id="info_${index}" role="tabpanel" aria-labelledby="infoList_${index}">`;
				html += `		<div class="card">`;
				html += `			<div class="card-body">`;
				html += ` 				<input type="button" class="btn btn-outline-warning float-right" value="修改" onclick="doEditModal('${id}');"/>`;
				html += `<pre>${name}<br>${address}<br>${phone}<br>${guiNumber}<br>${memo}</pre>`;
				html += getCharges(item.companyCharges);
				html += `			</div>`;
				html += `		</div>`;
				html += `	</div>`;
			});

			html += `	</div>`;
			html += `</div>`;

			$('#form2').append(html);

		}
	});
};

function detailChargeHTML() {}

function getCharges(charges) {

	let html = ``;

	if (false === $.isEmptyObject(charges)) {
		html += ` <table class="table table-sm table-condensed">`;
		html += ` <thead><tr> <th scope="col">地點</th> <th scope="col">櫃子呎吋</th>  <th scope="col">應收費用</th> <th scope="col">司機運費</th> <th scope="col">外調費用</th> </tr></thead>`;
		html += ` <tbody>`;
	}

	$.each(charges, function (i, item) {

		let size = (2 === item.size) ? '20/40呎 ' : (0 === item.size) ? '20呎' : '40呎';
		let destination = item.destinationCode;
		let pay = $.number(item.pay, 0);
		let fee = $.number(item.fee, 0);
		let os = $.number(item.outsourcing, 0);

		html += `<tr><td>${destination}</td><td>${size}</td><td>${pay}</td><td>${fee}</td><td>${os}</td></tr>`;
	});

	if (false === $.isEmptyObject(charges)) {
		html += `</tbody></table>`;
	}

	return html;

};

function findDesinationVal(key) {
	return fn.initData.defaultDestination.indexOf(key);
}

function editRow(charges) {

	let html = ``;

	html += ` <table class="table table-sm">`;
	html += ` <thead><tr> <th scope="col">地點</th> <th scope="col">櫃子呎吋</th> <th scope="col">應收費用</th> <th scope="col">司機運費</th> <th scope="col">外調費用</th> </tr></thead>`;
	html += ` <tbody>`;

	for (let {
		size: size,
		destinationCode: ds,
		pay: pay,
		fee: fee,
		outsourcing: os
	}
		of charges) {
		let sizeTxt = fn.getSizeDDL(size);
		let index = findDesinationVal(ds);
		let destinationDDL = `<select class="form-control" name="form3-companyCharges[destinationCode]"><option value="${index}">${ds}</option></select>`;
		let payInput = moenySign(`<input type="text" class="form-control currency" name="form3-companyCharges[pay]" value="${pay}" />`);
		let feeInput = moenySign(`<input type="text" class="form-control currency"name="form3-companyCharges[fee]" value="${fee}" />`);
		let osInput = moenySign(`<input type="text" class="form-control currency" name="form3-companyCharges[outsourcing]" value="${os}" />`);

		html += `<tr><td>${destinationDDL}</td><td styel="width:20%">${sizeTxt}</td><td>${payInput}</td><td>${feeInput}</td><td>${osInput}</td></tr>`;
	}

	html += `<tr><td><input type="button" class="btn btn-outline-success" value="新增運費" onclick="addRow();" /></td></tr>`;
	html += `</tbody></table>`;

	return html;

};

function moenySign(val) {
	return `<div class="input-group"><div class="input-group-prepend"><span class="input-group-text"><img src="images/dollar.png" width="20" height="20"></span></div>${val}</div>`;
}

function addTd(html) {
	return '<td>' + html + '</td>';
}

function addRow() {

	let pay = 0;
	let fee = 0;
	let os = 0;
	let payInput = moenySign(`<input type="text" class="form-control currency" dir="rtl" name="form3-companyCharges[pay]" value="" />`);
	let feeInput = moenySign(`<input type="text" class="form-control currency" name="form3-companyCharges[fee]" value="" />`);
	let osInput = moenySign(`<input type="text" class="form-control currency" name="form3-companyCharges[outsourcing]" value="" />`);

	let html = '';
	html += '<tr>';
	html += addTd(fn.getDestinationDDL());
	html += addTd(fn.getSizeDDL());
	html += addTd(payInput);
	html += addTd(feeInput);
	html += addTd(osInput);

	html += '</tr>';

	$('#form3-companyCharges tr:last').before(html);

	$('.currency').number(true, 0);
}

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
		$('#form3-companyCharges').append(editRow(resp.data.companyCharges));
		$("#editModal").modal();
		$('.currency').number(true, 0);
	});
}

function phoneFilter(phone) {
	let icon = commonUtils.getSkypIcon();
	let arr = phone.split("-");
	let arrLen = arr.length;
	if (3 === arrLen) {
		return arr[0] + arr[1] + icon + '分機' + arr[2];
	}
	return phone + icon;
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

		if (commonUtils.isNotEmpty(pay) || (commonUtils.isNotEmpty(fee) && commonUtils.isNotEmpty(os))) {
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

	if (hasSameJsonInJsonArray(JSON.companyCharges)) {
		return false;
	}

	return JSON;
}

function hasSameJsonInJsonArray(JSON) {
	let isSame = false;
	let len = JSON.length;
	for (let i = 0; i <= len - 1 && !isSame; i++) {
		for (let j = i + 1; j <= len - 1 && !isSame; j++) {
			isSame = _.isEqual(JSON[i], JSON[j]);
		}
	}
	return isSame;
}

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
