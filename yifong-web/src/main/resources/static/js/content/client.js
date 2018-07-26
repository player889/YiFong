{
	class Client {
		constructor() {
			this.columns = [{
					"data": "shortName"
				}
			];
			this.qUrl = "/content/client/init";
			this.doQuery();
		}
	
		doQuery() {

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
						console.log(json);
						return (typeof json.data == "undefined") ? [] : json.data;
					},
					"data": function(d){
						let src = {};
						src.shortName = $('#shortName').val();
						src.draw = 1;
						src.start = 1;
						src.length = 10;
						return JSON.stringify(src);
					}
				},
				"columns": [{
						"data": "shortName"
					}
				]
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
		
//		$('#query').on("click", function () {
//			client.doQuery();
//		});

//		$('#example_paginate').click(function () {
//			console.log('Showing page: ' + info.page + ' of ' + info.pages + ' ' + info.recordsTotal);
//			var info = $('#example').DataTable().page.info();
//			
//			let currentPage = info.page + 1;
//		});
	});
}
