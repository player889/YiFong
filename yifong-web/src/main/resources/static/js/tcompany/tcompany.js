class Company {

	query() {
		let data = {
			client: {}
		};
		let inputs = $('#input').val();
		data.client.shortName = inputs;

		let url = '/tcompany/tt';

		$('#resultsBlock').loadTempalte(url, data, function () {
			$('span.number').number(true, 0);
			$('span.phone').phone();

			$('.selectpicker').selectpicker({
				hideDisabled: true,
				dropupAuto: true
			});
		});

	}

	doEditModal(no) {

		let url = '/tcompany/model/edit';
		let data = {
			client: {}
		};
		data.client.no = no;

		$('#modelBlock').loadTempalte(url, data, function (HTML) {
			
			$('input.number').number(true, 0);
			$('.selectpicker').selectpicker({
				hideDisabled: true,
				dropupAuto: true
			});
			
			$('#collapseTwo').on('show.bs.collapse', function(){
				$('#addRowBtn').removeClass("hidden");
			});
			
			$('#collapseTwo').on('hide.bs.collapse', function(){
				$('#addRowBtn').addClass("hidden");
			});
			
			$('#model').modal('show');
		});
	}
	
	addChargeRow(){
		console.log($('#newRow').length);
		let $row = $('#newRow').html();
		console.log($row);
	}
	
}
let c = new Company();

//
// $("#resultsBlock").load(url, function(responseText, textStatus, XMLHttpRequest){
// alert("XX");
// });

// let d = JSON.stringify(data);
//
// $("#resultsBlock").load(url,d, function(responseText, textStatus, XMLHttpRequest){
// alert("XX");
// });
// $("#resultsBlock").load(url, {client : {'shortName' : $('#input').val()}});

// if (commonUtils.isEmpty(inputs)) {
// commonUtils.doAlert('warning', "請輸入資料");
// return;
// } else {

// }
//
// let self = this;
// commonUtils.doAjax('/tcompany/find/client', data);
