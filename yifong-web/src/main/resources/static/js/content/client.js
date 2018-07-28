{
	let _draw = 0;
	let _targetPage = 1;
	const _columns = [{"data": "shortName"}];
	
	let csrf_header = $("meta[name='_csrf_header']").attr("content");
	let csrf = $("meta[name='_csrf']").attr("content");
	let header = { csrf_header: csrf };
	
	const INIT_URL = "/content/client/init";
	const INIT_QUERY = "/content/client/query";
	
	class Client {
		
		constructor() {}
		
		getQData(){
			let src = {};
			src.shortName = $('#shortName').val();
			src.draw = _draw;
			src.start = _targetPage;
			return JSON.stringify(src);
		}
	
		doQuery() {
			
			var self = this;

			var header = $("meta[name='_csrf_header']").attr("content");
			var token = $("meta[name='_csrf']").attr("content");

			return $("#example").DataTable({
				"ajax": {
					"contentType": 'application/json',
					"url": "/content/client/init",
					"type": "POST",
					"headers": header,
					"dataSrc": function (json) {
						console.log(json);
						_draw = json.draw;
						return (typeof json.data == "undefined") ? [] : json.data;
					},
					"data": self.getQData
				},
				"columns": [{
						"data": "shortName"
					}
				]
			});
		}
	}

	$(document).ready(function () {
		
		let client = new Client();
		let dTable = client.doQuery();
		
		$('#query').on("click", function () {
			let path = ("" === $("#shortName").val().trim()) ? INIT_URL : INIT_QUERY;
			dTable.ajax.url(path).load();
		});
		
		// 導頁
		$('#example').on('page.dt', function () {
			var info = dTable.page.info();
			_targetPage = info.page + 1;
		});
	});
}
