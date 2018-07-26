{
	class Client {
		constructor() {
			this.columns = [{
					"data": "shortName"
				}
			];
			this.qUrl = "/content/client/init";
			this._draw = 1;
			this._targetPage = 1;
		}
	
		doQuery() {
			
			var self = this;

			var header = $("meta[name='_csrf_header']").attr("content");
			var token = $("meta[name='_csrf']").attr("content");

			var header = {
				header: token
			};

//			$('#example').DataTable().clear();
//			$('#example').DataTable().destroy();

			return $("#example").on('xhr.dt', function (e, settings, json, xhr) {
				// console.log("DD");
				// console.log(json);
				// var api = new $.fn.dataTable.Api( settings );
				// console.log(api.page.info());
				// for ( var i=0, ien=json.aaData.length ; i<ien ; i++ ) {
				// json.aaData[i].sum = json.aaData[i].one + json.aaData[i].two;
				// }
			})
			.DataTable({
				"ajax": {
					"contentType": 'application/json',
					"url": "/content/client/init",
					"type": "POST",
					"headers": header,
					"dataSrc": function (json) {
						console.log(JSON.stringify(json));
						self._draw = json.draw;
						return (typeof json.data == "undefined") ? [] : json.data;
					},
					"data": function(d){
						console.log("FF");
						let src = {};
						src.shortName = $('#shortName').val();
						src.draw = self._draw;
//						src.length = 10;
						src.start = self._targetPage;
						return JSON.stringify(src);
					}
				},
				"columns": [{
						"data": "shortName"
					}
				],
//				"infoCallback": function (settings, start, end, max, total, pre) {
//					var api = this.api();
//					var pageInfo = api.page.info();
//					return "第 " + start + " 至 " + end + " 項結果，共 " + total + " 項X";
//				}
			});
		}
	}

	$(document).ready(function () {
		
		let client = new Client();
		let dTable = client.doQuery();
		
			
//		$('#query').on("click", function () {
//			dTable.page(1).draw("page");
//			dTable.page(2);
//			dTable.ajax.reload();
//		});
		
		$('#example').on( 'page.dt', function () {
			var info = dTable.page.info();
			client._targetPage = info.page + 1;
		} );
	});
}
