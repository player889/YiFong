var fn = {
    init : function() {

	    doAjax('/common/destination/', {}, function(resp) {
		    fn.initData.trunk.destination = resp.data;
	    });

	    $("#input").enterKey(function(e) {
		    e.preventDefault();
		    findList(false);
	    });

    },
    initData : {
	    trunk : {
		    destination : ''
	    }
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
	var vo = {};
	if (/^\d+$/.test($('#input').val())) {
		vo.id = $('#input').val();
	} else {
		vo.name = $('#input').val();
	}
	return vo;
}

function findList(isShowDetail) {

	form2RemoveToggle('show');
	detailRemoveToggle('show');

	doAjax('/company/find/list', getVo(), function(resp) {

		$('#companyList, #companyDetail').empty();

		var data = resp.data.content;
		if ($.isEmptyObject(data)) {
			alert("無資料");
			form2RemoveToggle('hidden');
		} else {
			form2RemoveToggle('show');
			data.forEach(function(item, index, array) {
				let charges = (undefined === item.companyCharges) ? '{}' : JSON.stringify(item.companyCharges);
				$('#companyList').append('<a class="list-group-item list-group-item-action" data-toggle="list" href="#detail" role="tab" data-charges=' + charges + ' data-detail=' + JSON.stringify(item.companyDetail) + '>' + item.id + '  ' + item.name + '</a>');
			});

			$('a[data-toggle="list"]').on('shown.bs.tab', function(e) {
				doDetail($(this).data("detail"), $(this).data("charges"));
			});

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
	let guiNumber = detailData.guiNumber;
	let memo = detailData.memo;

	var html = `<div class="card-body" id="detail">`;
	html += `<input type="button" class="btn btn-outline-warning float-right" onclick="" value="修改" />${name} <br>地址:  ${address} <br>電話:  ${phone} <br>統一編號 ${guiNumber} <br>備註: ${memo}`;

	return html;

}

function doDetail(detailData, chargeData) {

	detailRemoveToggle('hidden');

	let detailHTML = getDetailHtml(detailData) + getChargeHtml(chargeData);

	$('#companyDetail').append(detailHTML);
}

function getChargeHtml(chargeData) {

	let html = '';
	if (false === $.isEmptyObject(chargeData)) {
		html += '<table class="table table-sm ">';
		html += '<thead><tr> <th scope="col">地點</th> <th scope="col">應收費用</th> <th scope="col">司機運費</th> <th scope="col">櫃子呎吋</th> <th scope="col">外調費用</th> </tr></thead>';
		html += '<tbody>';
		for (let i = 0; i <= fn.initData.trunk.destination.length - 1; i++) {
			let text = fn.initData.trunk.destination[i];

			let count = 0;
			$.each(chargeData, function(i, item) {
				if (text === item['destinationCode']) {
					let size = (3 === item.size) ? '20/40呎 ' : (1 === item.size) ? '20呎' : '40呎';
					html += '<tr><td>' + text + '</td><td>' + item.pay + '</td><td>' + item.fee + '</td><td>' + size + '</td><td>' + item.outsourcing + '</td></tr>';
					count++;
				}
			});
		}
		html += '</tbody></table></div>';
	}

	return html;

}

function saveFn() {
	var id = $('#form3 input[name="id"]').val();
	let extraData = {
		companyDetail : {
			id : id
		}
	};
	doAjax('/company/save', '#form3', function(data) {
		$('#form1 input[name="id"]').val(id);
		findList(true);
		alert(data.message);
	}, extraData);

};

function deleteFn() {
	doAjax('/company/delete', '#form4');
};

