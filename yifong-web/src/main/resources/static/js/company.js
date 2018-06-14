var trunk = {
	destination : ''
};

var fn = {
	init : function() {
		doAjax('/common/destination/', {}, function(resp) {
			// {0: "基隆", 1: "台北港", 2: "桃園", 3: "楊梅", 4: "湖口", 5: "台中", 6: "高雄", 7: "銅鑼"}
			trunk.destination = Object.values(JSON.parse(resp.data));
		});
	}
};

fn.init();

function findList() {
	doAjax('/company/find/list', $('#form1').serializeObject(), function(resp) {

		clearTable([ '#resultTable', '#detailTable' ]);

		var data = resp.data.content;
		if (0 === data.length) {
			alert("無資料");
		} else {
			let html = "";
			data.forEach(function(item, index, array) {
				html += '<a href="javascript:void(0);" onclick="findDetail(' + item.id + ',\'#detailTable\')">' + item.name + '</a><br>';
			});
			$('#resultTable').append(html);
		}

	});
};

function findDetail(detailId, tableId) {
	doAjax('/company/find/' + detailId, {}, function(resp) {

		clearTable(tableId);

		let html = "";
		let main = resp.data;
		let detail = main.companyDetail;
		let charges = main.companyCharges;

		html += '<tr><td>' + main.id + '</td><td>' + detail.name + '</td><td>' + detail.address + '</td><td>' + detail.phone + '</td><td>' + detail.guiNumber + '</td></tr>';

		// {基隆: 7300, 台北港: 7300, 桃園: 4800, 楊梅: 4800, 台中: 5300}
		var chargeMaps = _.object(_.map(charges, function(item) {
			return [ item.destinationCode, item.fee ];
		}));

		for (var i = 0; i <= trunk.destination.length - 1; i++) {
			let text = trunk.destination[i];
			let tmp = _.propertyOf(chargeMaps)(text);
			let fee = (undefined === tmp) ? 0 : tmp;
			html += '<tr><td>' + text + '</td><td>' + fee + '</td></tr>';
		}

		$(tableId).append(html);

	});
};

function clearTable(tableIds) {
	if (tableIds instanceof Array) {
		for (var i = 0; i <= tableIds.length - 1; i++) {
			$(tableIds[i]).children().remove()
		}
	} else {
		$(tableIds).children().remove()
	}
};

function save() {
	doAjax('/company/save', $('#form1').serializeObject());
};
