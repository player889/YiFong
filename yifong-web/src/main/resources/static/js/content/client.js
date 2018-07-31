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

		getColumnDefs() {
			let array = [];
			let item = ["", "shortName", "phone", "guiNumber", "address", "memo"];
			let obj = {};
			obj.targets = "_all";
			obj.defaultContent = "";
			array.push(obj);

			item.forEach(function (item, index) {
				let obj3 = {};
				obj3.targets = index;
				obj3.data = item;

				if (index == 0) {
					obj3.class = "control";
				}
				
				if(index == item.length -1){
					obj3.className = "none";
				}
				
				array.push(obj3);
			});
			
			let obj4 = {};
				obj4.targets = item.length;
				obj4.data = "charges";
//				obj4.render= "[,]charges";
				array.push(obj4);
			
			return array;
		}
		
		getResponsiveColumns(col){
			
			if(col.hidden){
				return '<tr class="data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '" style="border-style: none;">' +
				'<td style="border-style: none;">' + col.title + ':' + '</td> ' +
				'<td style="border-style: none;">' + col.data + '</td></tr>';
			}
			
			return '';
			
			
			
//			if (col.title === '備註' && col.data === '') {
//				
//			} else if(col.title === "運費" && col.data.length > 0) {
//				
//				var html = '<table id="test" class="table table-hover responsive" style="width:100%"> <thead> <tr> <th>Name</th> <th>Position</th> </tr> </thead> <tbody> <tr> <td>Tiger Nixon</td> <td>System Architect</td>  </thead> </table>';
//				return col.hidden ? html : '';
//				return col.hidden ?
//						'<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
//						'<td colspan="6">' + col.title + ':' + '</td> ' +
//						'<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
//						col.data.map(function(item, index, array){
//							return '<td>' + item.dest + '</td><td>' + item.size + '</td><td>' + item.pay + '</td><td>' + item.fee + '</td><td>' + item.os + '</td>'
//						}).join("")
//				
//						+'</tr>'
//						:
//						'';

//				console.log(a);
//				{dest: "0", fee: 600, os: 0, pay: 7000, size: 2, …}
//			} else {
				
//			<td class="child" colspan="8">
//				<ul data-dtr-index="4" class="dtr-details">
//					<li data-dtr-index="8" data-dt-row="4" data-dt-column="8">
//						<span class="dtr-title">Extn.</span>
//						<span class="dtr-data">5407</span>
//					</li>
//				</ul>
//			</td>
				
//				return col.hidden ? 
//					'<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
//					'<td>' + col.title + ':' + '</td> ' +
//					'<td>' + col.data + '</td></tr>' :
//					'';
//			}
		}
		
		doQuery() {

			var self = this;

			return $("#example").DataTable({
//				createdRow: function( row, data, dataIndex ) {
//					$(row).addClass("table-info");
//					if(dataIndex % 2 == 0 ){
//						$(row).addClass("table-warning");
//						$(row).addClass("bg-light");
//					}
//				},
//				  "formatNumber": function ( toFormat ) {
//					     //使用正则表达式匹配，替换数字
////					    return toFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
//					  },
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
				"columnDefs": self.getColumnDefs(),
				responsive: {
					details: {
						type: 'column',
						target: 'tr',
						renderer: function (api, rowIdx, columns) {
							var data = $.map(columns, function (col, i) {
									return self.getResponsiveColumns(col);
								}).join('');
							
					
							let result = data ? $('<table/>').append(data) : false;
							
							
//							var subTable = $("#test").DataTable({
//								"responsive": true,
//								"ajax": columns[5].data,
//								"columnDefs": [{data:"pay", targets:0},{data:"dest", targets:0}]
//							}).columns.adjust().responsive.recalc();
							
							return result;
						}
					}
				}
			}).columns.adjust().responsive.recalc();
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
		
		 // Add event listener for opening and closing details
		$('#example tbody').on('click', 'tr', function () {
			let c = $(this).index();
		});
		
	});
}
