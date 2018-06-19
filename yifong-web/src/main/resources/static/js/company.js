var fn = {
    init : function() {
	    doAjax('/common/destination/', {}, function(resp) {
		    fn.initData.trunk.destination = resp.data;
	    });
	    ShowHideForm('#form1', [ '#form3', '#form4' ]);
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

	var isNumber = /^\d+$/.test($('#input').val());

	if (isNumber) {
		data.id = $('#input').val();
	} else {
		data.name = $('#input').val();
	}

	console.log(data);

	doAjax('/company/find/list', data, function(resp) {

		console.log("OK");

		clearTable([ '#resultTable', '#detailTable', '#chargeTable' ]);

		var data = resp.data.content;
		if ($.isEmptyObject(data)) {
			alert("無資料");
		} else if (1 == 1) {
			listModal();
		} else {

			let html = "";
			data.forEach(function(item, index, array) {
				html += '<a href="javascript:void(0);" id="showDetail" onclick="findDetail(' + item.id + ')">' + item.name + '</a><br>';
			});
			$('#resultTable').append(html);

			(1 >= data.length || isShowDetail) && $('#showDetail').click();

		}
	});
};

function findDetail(detailId) {
	doAjax('/company/find/' + detailId, {}, function(resp) {

		clearTable([ "#detailTable", "#chargeTable" ]);

		let main = resp.data;
		let detail = main.companyDetail;
		let detailHtml = '<tr><td>' + main.id + '</td><td>' + detail.name + '</td><td>' + detail.address + '</td><td>' + detail.phone + '</td><td>' + detail.guiNumber + '</td></tr>';
		detailHtml += (undefined == detail.memo) ? '' : '<tr><td>' + detail.memo + '</td></tr>';
		$('#detailTable').append(detailHtml);

		let chargeHtml = '';
		let charges = main.companyCharges;
		for (let i = 0; i <= fn.initData.trunk.destination.length - 1; i++) {
			let text = fn.initData.trunk.destination[i];
			chargeHtml += '<tr><td><b>' + text + '</b></td></tr>';

			let count = 0;
			$.each(charges, function(i, item) {
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

		$('#chargeTable').append(chargeHtml);

		// var chargeMaps = _.object(_.map(charges, function(item) {
		// let size = (3 === item.size) ? '20/40呎 ' : (1=== item.size) ? '20呎' : '40呎';
		// return [ item.destinationCode, item.fee, item.outsourcing, item.pay, size];
		// }));

		// console.log(chargeMaps);

	});
};

function listModal() {

//	var header = $("meta[name='_csrf_header']").attr("content");
//	var token = $("meta[name='_csrf']").attr("content");
//	console.log("@@@@@@@");
	
	doModal('/company/list/modal', {} , '#content');
	
//	$.ajax({
//	    url : ,
//	    type : 'GET',
//	    // contentType : 'application/json; charset=utf-8',
//	    dataType : 'html',
//	    data : {},
//	    beforeSend : function(xhr, settings) {
//		    xhr.setRequestHeader(header, token);
//	    },
//	    success : function(data) {
//		    $('#content').html(data);
//	    }
//	});

}

function doFilter(data) {
	var json = [];
	$.each(data, function(i, item) {
		let size = (3 === item.size) ? '20/40呎 ' : (1 === item.size) ? '20呎' : '40呎';
		json.push({
		    pay : item.pay,
		    fee : item.fee,
		    outsourcing : item.outsourcing,
		    size : size
		});
	});
	return json;
};

function clearTable(tableIds) {
	if (tableIds instanceof Array) {
		for (let i = 0; i <= tableIds.length - 1; i++) {
			$(tableIds[i]).children().remove();
		}
	} else {
		$(tableIds).children().remove();
	}
};

function saveFn() {
	ShowHideForm('#form1', [ '#form3', '#form4' ]);
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
	ShowHideForm('#form1', [ '#form3', '#form4' ]);
};

function ShowHideForm(showId, hideIds) {
	clearTable([ '#resultTable', '#detailTable', '#chargeTable' ])
	$(showId).trigger('reset').show();
	$.each(hideIds, function(i, id) {
		$(id).hide();
	});
};