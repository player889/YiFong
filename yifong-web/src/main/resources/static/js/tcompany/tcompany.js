class Company {

	query() {
		let data = {
			client: {}
		};
		let inputs = $('#input').val();
			data.client.shortName = inputs;
		
		let url = '/tcompany/tt';
			
		
// commonUtils.doAjax('/company/find/client', data, function (resp) {
// console.log(resp);
// });
		$('#resultsBlock').loadTempalte(url,data);
			
	}
	
	doEditModal(no){
//		
// let fullName = $('[name="fullName"]').eq(index).text();
// let address = $('span[name="address"]').eq(index).text();
// let phone = $('span[name="phone"]').eq(index).text();
// let guiNumber = $('span[name="guiNumber"]').eq(index).text();
// let memo = $('span[name="memo"]').eq(index).html();
//		
// // $('#editModal').modal('show')
		
		let url = '/tcompany/model/edit';
		let data = {
			client: {}
		};
		data.client.no = no;
		
		$('#modelBlock').loadTempalte(url,data, function(HTML){
			$('#modelBlock').html(HTML);
			$('#model').modal('show')
		});
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
