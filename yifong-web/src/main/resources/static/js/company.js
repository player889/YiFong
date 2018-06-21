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

	doAjax('/company/find/list', data, function(resp) {

		let data = resp.data.content;
		if ($.isEmptyObject(data)) {
			alert("無資料");
		} else {

			let show = (0 === data.length - 1) ? 'show active' : '';

			let html = ``;

			html += `<div class="row" id="content">`;
			html += `<div class="col-2">`;
			html += `	<div class="list-group" id="companyList" role="tablist">`;
			data.forEach(function(item, index, array) {
				let id = item.id;
				let name = item.name;
				html += `	<a class="list-group-item list-group-item-action ${show}" href="#info_${index}" role="tab" data-toggle="list" id="infoList_${index}">${id} ${name}</a>`;
			});
			html += `	</div>`;
			html += `</div>`;

			html += `<div class="col-10 scrollBar">`;
			html += `	<div class="tab-content">`;
			data.forEach(function(item, index, array) {
				let info = item.companyDetail;
				let name = info.name;
				let address = info.address;
				let phone = info.phone;
				let guiNumber = commonUtils.getValue(info.guiNumber);
				let memo = commonUtils.getValue(info.memo);

				html += `	<div class="tab-pane fade ${show}" id="info_${index}" role="tabpanel" aria-labelledby="infoList_${index}">`;
				html += `		<div class="card">`;
				html += `			<div class="card-body">`;
				html += ` 				<input type="button" class="btn btn-outline-warning float-right" value="修改" onclick="test();"/>`;
				html += ` 				${name} <br>地址: ${address} <br>電話: ${phone} <br>統一編號 ${guiNumber} <br>備註: ${memo}`;
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

function getCharges(charges) {

	let html = ``;

	fn.initData.trunk.useDestination = [];
	if (false === $.isEmptyObject(charges)) {
		html += ` <table class="table table-sm ">`;
		html += ` <thead><tr> <th scope="col">地點</th> <th scope="col">應收費用</th> <th scope="col">司機運費</th> <th scope="col">櫃子呎吋</th> <th scope="col">外調費用</th> </tr></thead>`;
		html += ` <tbody>`;
	}

	$.each(charges, function(i, item) {

		let size = (3 === item.size) ? '20/40呎 ' : (1 === item.size) ? '20呎' : '40呎';
		let destination = item.destinationCode;
		let pay = item.pay;
		let fee = item.fee;
		let os = item.outsourcing;
		html += `<tr><td>${destination}</td><td>${pay}</td><td>${fee}</td><td>${size}</td><td>${os}</td></tr>`;
		fn.initData.trunk.useDestination.push(item.destinationCode);
	});

	if (false === $.isEmptyObject(charges)) {
		html += `</tbody></table>`;
	}

	return html;

}

function test() {
	$('#form3').append(fn.getDestinationDDL());
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