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
	doAjax('/company/find/list', '#form1', function(resp) {

		clearTable([ '#resultTable', '#detailTable', '#chargeTable' ]);

		var data = resp.data.content;
		if ($.isEmptyObject(data)) {
			alert("無資料");
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
		let charges = main.companyCharges;

		var chargeMaps = _.object(_.map(charges, function(item) {
			return [ item.destinationCode, item.fee ];
		}));

		let detailHtml = '<tr><td>' + main.id + '</td><td>' + detail.name + '</td><td>' + detail.address + '</td><td>' + detail.phone + '</td><td>' + detail.guiNumber + '</td></tr>';
		detailHtml += '<tr><td>' + detail.memo + '</td></tr>';
		$('#detailTable').append(detailHtml);

		let chargeHtml = "";
		for (var i = 0; i <= fn.initData.trunk.destination.length - 1; i++) {
			let text = fn.initData.trunk.destination[i];
			let tmp = _.propertyOf(chargeMaps)(text);
			let fee = (undefined === tmp) ? 0 : tmp;
			chargeHtml += '<tr><td>' + text + '</td><td align="right">' + fee + '</td></tr>';
		}
		$('#chargeTable').append(chargeHtml);

	});
};

function clearTable(tableIds) {
	if (tableIds instanceof Array) {
		for (var i = 0; i <= tableIds.length - 1; i++) {
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