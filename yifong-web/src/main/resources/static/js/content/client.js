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

				//				if(index <= 3){
				//					obj3.width = "33%";
				//				}

				array.push(obj3);
			});

			return array;
		}

		format(d) {
			return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
			'<tr>' +
			'<td>備註</td>' +
			'<td>' + d.memo + '</td>' +
			'</tr>' +
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
				"columnDefs": self.getColumnDefs(),
				responsive: {
					details: {
						type: 'column',
						target: 'tr'
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
