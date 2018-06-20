var fn = {
    init : function() {
	    doAjax('/common/destination/', {}, function(resp) {
		    fn.initData.trunk.destination = resp.data;
	    });
    },
    initData : {
	    trunk : {
		    destination : ''
	    }
    }
};

fn.init();

function findList(isShowDetail) {

	var data = {};

	if (/^\d+$/.test($('#input').val())) {
		data.id = $('#input').val();
	} else {
		data.name = $('#input').val();
	}

	doAjax('/company/find/list', data, function(resp) {

		$('#companyList, #companyDetail').empty();
		$('#chargesTable').remove();

		var data = resp.data.content;
		if ($.isEmptyObject(data)) {
			alert("無資料");
		} else {

			data.forEach(function(item, index, array) {
				let charges = (undefined === item.companyCharges) ? '{}' : JSON.stringify(item.companyCharges);
				$('#companyList').append('<a class="list-group-item list-group-item-action" data-toggle="list" href="#detail" role="tab" data-charges=' + charges + ' data-detail=' + JSON.stringify(item.companyDetail) + '>' + item.id + '  ' + item.name + '</a>');
			});

			$('a[data-toggle="list"]').on('shown.bs.tab', function(e) {
				$('#companyDetail').empty();
				doDetail($(this).data("detail"), $(this).data("charges"));
			});

			if (data.length === 1) {
				$('#companyList a:first-child').tab('show');
			}

		}
	});
};

function showDetail(detailData) {

	let name = detailData.name;
	let address = detailData.address;
	let phone = detailData.phone;
	let guiNumber = detailData.guiNumber;
	let memo = detailData.memo;

	var html = `<input type="button" class="btn btn-outline-secondary float-right" onclick="" value="修改" />${name} <br>地址:  ${address} <br>電話:  ${phone} <br>統一編號 ${guiNumber} <br>備註: ${memo}`;

	$('#companyDetail').append(html);
}

function doDetail(detailData, chargeData) {

	showDetail(detailData);

	$('#chargesTable').remove();
	if (false === $.isEmptyObject(chargeData)) {
		showCharges(chargeData);
	}
}

function showCharges(chargeData) {

	if (false === $.isEmptyObject(chargeData)) {

		let chargeHtml = '<table id="chargesTable">';
		for (let i = 0; i <= fn.initData.trunk.destination.length - 1; i++) {
			let text = fn.initData.trunk.destination[i];
			chargeHtml += '<tr><td><b>' + text + '</b></td></tr>';

			let count = 0;
			$.each(chargeData, function(i, item) {
				if (text === item['destinationCode']) {
					chargeHtml += '<tr><td>應收費用</td><td>外調費用</td><td>司機運費</td><td>櫃子呎吋</td></tr>';
					let size = (3 === item.size) ? '20/40呎 ' : (1 === item.size) ? '20呎' : '40呎';
					chargeHtml += '<tr><td>' + item.pay + '</td><td>' + item.outsourcing + '</td><td>' + item.fee + '</td><td>' + size + '</td></tr>';
					count++;
				}
			});
			if (0 == count) {
				chargeHtml += '<tr><td>應收費用</td><td>外調費用</td><td>司機運費</td><td>櫃子呎吋</td></tr>';
				chargeHtml += '<tr><td>0</td><td>0</td><td>0</td><td>無</td></tr>';
			}
		}
		chargeHtml += '</table>';
		$('#companyDetail').after(chargeHtml);
	}

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

