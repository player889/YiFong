{
	let _draw = 0;
	let _targetPage = 1;
	const _columns = [{
			"data": "shortName"
		}
	];

	let csrf_header = $("meta[name='_csrf_header']").attr("content");
	let csrf = $("meta[name='_csrf']").attr("content");
	let header = {
		csrf_header: csrf
	};

	const INIT_URL = "/content/client/init";
	const INIT_QUERY = "/content/client/query";

	class Client {

		constructor() {}

		getQData() {
			let src = {};
			src.shortName = $('#shortName').val();
			src.draw = _draw;
			src.start = _targetPage;
			return JSON.stringify(src);
		}
		
		getColumnDefs(){
			let array = [];
			let item = ["shortName","guiNumber","phone","address","memo"];
			let obj = {};
				obj.targets = "_all";
				obj.defaultContent = "";
				array.push(obj);
				
				item.forEach(function(item, index){
					let obj3 = {};
					obj3.targets = index;
					obj3.data = item;
					array.push(obj3);
				});
				
			return array;
		}
		
		format ( d ) {
		    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
		        '<tr>'+
		            '<td>備註</td>'+
		            '<td>'+d.memo+'</td>'+
		        '</tr>'+
		    '</table>';
		}

		doQuery() {

			var self = this;

			return $("#example").DataTable({
				"ajax": {
					"contentType": 'application/json',
					"url": "/content/client/init",
					"type": "POST",
					"headers": header,
					"dataSrc": function (json) {
						_draw = json.draw;
						return (typeof json.data == "undefined") ? [] : json.data;
					},
					"data": self.getQData
				},
				"columnDefs": self.getColumnDefs()
//				"columnDefs": [{
//					"targets": "_all",
//					"defaultContent": "",
//
//				},
//				{
//					"targets": 0,
//					"data": "shortName"
//
//				}, {
//					"targets": 1,
//					"data": "guiNumber"
//
//				}, {
//					"targets": 2,
//					"data": "phone"
//
//				}, {
//					"targets": 3,
//					"data": "address"
//
//				}, {
//					"targets": 4,
//					"data": "memo"
//				}
//			]
//				"columnDefs": self.getColumnDefs()
//				,responsive: {
//					details: {
//						type: 'column',
//						target: 'tr',
//						renderer: function (api, rowIdx, columns) {
//							var data = $.map(columns, function (col, i) {
//									console.log(columns);
//									if (col.title === '備註' && col.data === '') {}
//									else {
//										return col.hidden ?
//										'<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
//										'<td>' + col.title + ':' + '</td> ' +
//										'<td>' + col.data + '</td>' +
//										'</tr>' :
//										'';
//									}
//								}).join('');
//							return data ? $('<table/>').append(data) : false;
//						}
//					}
//				}
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
		
//	    // Add event listener for opening and closing details
//	    $('#example tbody').on('click', 'td.details-control', function () {
//	    	
//	    	let icon = $(this).children("svg").data("icon")
//	    	
//	        var tr = $(this).closest('tr');
//	        var row = dTable.row( tr );
//	        if ( row.child.isShown() ) {
//	            // This row is already open - close it
//	            row.child.hide();
//	            tr.removeClass('shown');
//	        }
//	        else {
//	            // Open this row
//	            row.child(client.format(row.data()) ).show();
//	            tr.addClass('shown');
//	        }
//	    } );
	});
}
