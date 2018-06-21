let fn = {
    init : function() {

	    doAjax('/common/destination/', {}, function(resp) {
		    fn.initData.trunk.defaultDestination = resp.data;
	    });

	    $("#input").enterKey(function(e) {
		    e.preventDefault();
		    query(false);
	    });

    },
    initData : {
	    trunk : {
	        defaultDestination : '',
	        useDestination : []
	    }
    },
    getDestinationDDL : function() {

	    let defaultArr = fn.initData.trunk.defaultDestination;
	    let existArr = fn.initData.trunk.useDestination;

	    let html = '<select>';
	    let data = defaultArr.filter(function(obj) {
		    return existArr.indexOf(obj) == -1;
	    });

	    $.each(data, function(i, item) {
		    html += '<option>' + item + '</option>';
	    });

	    return html;
    }
};

fn.init();

function form2RemoveToggle(removeClazz) {
	let addClazz = ('show' === removeClazz) ? 'hidden' : 'show';
	$('#form2').removeClass(removeClazz).addClass(addClazz);
}

function detailRemoveToggle(removeClazz) {
	let addClazz = ('show' === removeClazz) ? 'hidden' : 'show';
	$('#companyDetail').empty().removeClass(removeClazz).addClass(addClazz);
}

function getVo() {

	let data = $('#input').val();

	let vo = {};
	if (/^\d+$/.test(data)) {
		vo.id = data;
	} else if (data) {
		vo.name = data;
	}

	return vo;
}

function query(isShowDetail) {

	let data = getVo();
	// if ($.isEmptyObject(data)) {
	// alert("請輸入資料");
	// return;
	// }

	$('#form2').empty();

	// form2RemoveToggle('show');
	// detailRemoveToggle('show');

	doAjax('/company/find/list', data, function(resp) {

		// $('#companyList, #companyDetail').empty();

		let data = resp.data.content;
		if ($.isEmptyObject(data)) {
			alert("無資料");
		} else {

			let html = `<div class="row" id="content">`;

			let temp = {};

			data.forEach(function(item, index, array) {

				if (0 === index) {
					html += `<div class="col-2">`;
					html += `<div class="list-group" id="companyList" role="tablist">`;
				}

				let id = item.id;
				let name = item.name;
				let charges = (undefined === item.companyCharges) ? '{}' : JSON.stringify(item.companyCharges);
				let detail = JSON.stringify(item.companyDetail);
				html += `<a class="list-group-item list-group-item-action" href="#detail" role="tab" data-toggle="list" `;
				html += `data-charges=${charges} data-detail=${detail} >${id} ${name}</a>`;

				if (index === data.length - 1) {
					html += `</div>`;
					html += `</div>`;
				}

				temp = item.companyDetail;

			});

			$('#form2').append(html);

			var h2 = getDetailHtml(temp);

			$('#content').append(h2);

			// $('a[data-toggle="list"]').on('shown.bs.tab', function(e) {
			// doDetail($(this).data("detail"), $(this).data("charges"));
			// });

			if (data.length === 1) {
				$('#companyList a:first-child').tab('show');
			}

		}
	});
};

function getDetailHtml(detailData) {

	let name = detailData.name;
	let address = detailData.address;
	let phone = detailData.phone;
	let guiNumber = commonUtils.getValue(detailData.guiNumber);
	let memo = commonUtils.getValue(detailData.memo);

	let html = `<div class="col-10 scrollBar">`;

	html += `<div class="tab-content" id="nav-tabContent">`;
	html += `<div class="card" id="companyDetail">`;
	html += `<div class="card-body" id="detail">`;
	html += `<input type="button" class="btn btn-outline-warning float-right" onclick="" value="修改" />${name} <br>地址:  ${address} <br>電話:  ${phone} <br>統一編號 ${guiNumber} <br>備註: ${memo}`;
	html += `</div>`;
	html += `</div>`;
	html += `</div>`;
	html += `</div>`;

	return html;

}

function doDetail(detailData, chargeData) {

	// detailRemoveToggle('hidden');

	let detailHTML = '<div class="col-10 scrollBar"><div class="tab-content"><div class="card" id="companyDetail">'

	detailHTML += getDetailHtml(detailData) + getChargeHtml(chargeData);

	detailHTML += '</div></div></div>'

	$('#content').append(detailHTML);
}

function getChargeHtml(chargeData) {

	let html = '';
	fn.initData.trunk.useDestination = [];

	if (false === $.isEmptyObject(chargeData)) {
		html += '<table class="table table-sm ">';
		html += '<thead><tr> <th scope="col">地點</th> <th scope="col">應收費用</th> <th scope="col">司機運費</th> <th scope="col">櫃子呎吋</th> <th scope="col">外調費用</th> </tr></thead>';
		html += '<tbody>';

		let count = 0;
		$.each(chargeData, function(i, item) {
			let size = (3 === item.size) ? '20/40呎 ' : (1 === item.size) ? '20呎' : '40呎';
			html += '<tr><td>' + item.destinationCode + '</td><td>' + item.pay + '</td><td>' + item.fee + '</td><td>' + size + '</td><td>' + item.outsourcing + '</td></tr>';
			count++;

			fn.initData.trunk.useDestination.push(item.destinationCode);
		});
		html += '</tbody></table></div>';
	}

	return html;

}

function saveFn() {
	let id = $('#form3 input[name="id"]').val();
	let extraData = {
		companyDetail : {
			id : id
		}
	};
	doAjax('/company/save', '#form3', function(data) {
		$('#form1 input[name="id"]').val(id);
		query(true);
		alert(data.message);
	}, extraData);

};

function deleteFn() {
	doAjax('/company/delete', '#form4');
};