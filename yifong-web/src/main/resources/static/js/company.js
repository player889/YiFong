let fn = {
    init : function() {

	    doAjax('/common/destination/', {}, function(resp) {

		    resp.data['台中'][1] = false;
		    resp.data['台中'][2] = false;
		    resp.data['台中'][3] = false;

		    fn.initData.defaultDestination = resp.data;
		    fn.initData.usedDestination = resp.data;
	    });

	    $("#input").enterKey(function(e) {
		    e.preventDefault();
		    query(false);
	    });

	    $('#editModal').on('hidden.bs.modal', function(e) {
		    // $('#editContent').empty();
		    fn.initData.usedDestination = fn.initData.defaultDestination;
		    console.log("close");
	    });

    },
    initData : {
        defaultDestination : {},
        usedDestination : {}
    },
    followUp : function() {
	    $.each(fn.initData.usedDestination, function(k, v) {
		    let data = fn.initData.usedDestination[k];
		    data['disable'] = dd(data);
	    });
    },
    getDestinationDDL : function() {
	    fn.followUp();
	    var data = fn.initData.usedDestination;
	    console.log(data);
	    var options = '';
	    $.each(data, function(k, v) {
		    if (false === data[k]['disable']) {
			    options += '<option>' + k + '</option>';
		    } else {
			    options += '';
		    }
	    });
	    var html = '<select>' + options + '</select>';

	    // FIXME contniue
	    console.log(html);
    }
};

function dd(data) {
	var result = true;
	for ( var i in data) {
		if (data[i] === true) {
			result = false;
			break;
		}
	}
	return result
}

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
				let id = item.id;
				let name = info.name;
				let address = info.address;
				let phone = phoneFilter(info.phone);
				let guiNumber = commonUtils.getValue(info.guiNumber);
				let memo = commonUtils.getValue(info.memo);

				html += `	<div class="tab-pane fade ${show}" id="info_${index}" role="tabpanel" aria-labelledby="infoList_${index}">`;
				html += `		<div class="card">`;
				html += `			<div class="card-body">`;
				html += ` 				<input type="button" class="btn btn-outline-warning float-right" value="修改" onclick="doEdit('${id}');"/>`;
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

function getCharges(charges) {

	let html = ``;

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

		if (fn.initData.usedDestination.hasOwnProperty(item.destinationCode)) {
			fn.initData.usedDestination[item.destinationCode][item.size] = false;
		}

	});

	if (false === $.isEmptyObject(charges)) {
		html += `</tbody></table>`;
	}

	console.log(fn.initData.usedDestination);

	return html;

};

function getEditCharges(charges) {

	let html = ``;

	html += ` <table class="table table-sm ">`;
	html += ` <thead><tr> <th scope="col">地點</th> <th scope="col">應收費用</th> <th scope="col">司機運費</th> <th scope="col">櫃子呎吋</th> <th scope="col">外調費用</th> </tr></thead>`;
	html += ` <tbody>`;

	$.each(charges, function(i, item) {

		let size = (3 === item.size) ? '20/40呎 ' : (1 === item.size) ? '20呎' : '40呎';
		let destination = item.destinationCode;
		let pay = item.pay;
		let fee = item.fee;
		let os = item.outsourcing;
		let payInput = `<input type="number" name="form3-companyCharges[pay]" value="${pay}" />`;
		let feeInput = `<input type="number" name="form3-companyCharges[fee]" value="${fee}" />`;
		let osInput = `<input type="number" name="form3-companyCharges[outsourcing]" value="${os}" />`;

		// let options1 = item.size === 1 ? `selected` : ``;
		// let options2 = item.size === 2 ? `selected` : ``;
		// let options3 = item.size === 3 ? `selected` : ``;
		// let osOptions = `<option value="1" ${options1}>20呎`;
		// osOptions += `</option><option value="2" ${options2}>40呎</option>`;
		// osOptions += `<option value="3" ${options3}>20/40呎 </option>`;
		// let osSelect = `<select name=name="form3-companyCharges[size]">${osOptions}<selected>`;

		html += `<tr><td>${destination}</td><td>${payInput}</td><td>${feeInput}</td><td>${size}</td><td>${osInput}</td></tr>`;
	});

	html += `<tr><td><input type="button" class="btn btn-outline-success" value="新增運費" onclick="test();" /></td></tr>`;
	html += `</tbody></table>`;

	return html;

};

function test() {

	fn.getDestinationDDL();

	// var ddls = $('select[name="form3-companyCharges[destinationCode]"').last();
	// var text = $('option:selected', ddls).text();
	//
	// if ('' != text) {
	// fn.initData.useDestination.push(text);
	// }
	//
	// let html = '';
	// html = '<tr><td>' + fn.getDestinationDDL('form3-companyCharges[destinationCode]') + '</td></tr>';
	// $('#form3-companyCharges tr:last').before(html);
	//
	// ss();
}

// function ss() {
// let previous = '';
// var dom = $('select[name="form3-companyCharges[destinationCode]"');
// dom.each(function() {
// let isRepeat;
// $(this).on('focus', function() {
// previous = this.value;
// }).on('change', function() {
// var arr = [];
// dom.each(function() {
// arr.push($('option:selected', this).text());
// });
// if (hasDuplicates(arr)) {
// alert("新增重覆");
// $(this).val(previous);
// return;
// }
// previous = this.value;
//
// });
// });
// }

function hasDuplicates(array) {
	return (new Set(array)).size !== array.length;
}

function doEdit(id) {
	doAjax('/company/find/' + id, {}, function(resp) {
		var html = getEditCharges(resp.data.companyCharges);
		$('#form3-companyCharges').append(html);
		$("#editModal").modal();
	});

	// $('#form3').append(fn.getDestinationDDL());
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

function saveFn() {

	// let id = $('#form3 input[name="id"]').val();
	// let extraData = {
	// companyDetail : {
	// id : id
	// }
	// };
	// doAjax('/company/save', '#form3', function(data) {
	// $('#form1 input[name="id"]').val(id);
	// query(true);
	// alert(data.message);
	// }, extraData);

};

function deleteFn() {
	doAjax('/company/delete', '#form4');
};