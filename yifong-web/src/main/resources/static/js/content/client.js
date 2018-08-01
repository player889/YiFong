{
	const INIT_URL = "/content/client/init";
	const INIT_QUERY = "/content/client/query";

	class Client {

		constructor() {}

		getQData() {
			let src = {};
				src.shortName = $('#shortName').val();
			return JSON.stringify(src);
		}

		doQuery() {
		}
		
		ajaxFn(params) {
			$.ajax({
				url: INIT_URL,
				type: 'POST',
				contentType: 'application/json; charset=utf-8',
				dataType: 'json',
				data: JSON.stringify({shortName:""}),
				success: function (data) {
					params.success(data);
				}
			});
//			 main.doPost(INIT_URL, JSON.stringify({shortName:""}), function(data){
//				 params.success(data);
//			 });
		}
	}

	$(document).ready(function () {
		let client = new Client();
		$('#demo').bootstrapTable({
			ajax: client.ajaxFn,
			columns: [ 
			{
				title: 'shortName',
				field: 'shortName',
				switchable: true
			}]
		});
		
	});
}