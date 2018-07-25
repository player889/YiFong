{
	class Client {
		constructor() {}
	}

	$(document).ready(function () {
		let client = new Client();

		let d = new DataTable();

		var columns = [{
				"data": "shortName"
			}
		];

		var header = $("meta[name='_csrf_header']").attr("content");
		var token = $("meta[name='_csrf']").attr("content");

		var dataTableAjax = {
			"headers": {
				header: token
			},

			data: function (data) {
				let obj = {};
				obj.shortName = $('#shortName').val();
				obj.draw = 1;
				obj.length = 10;
				obj.start = 1;
				return JSON.stringify(obj);
			},

			"contentType": 'application/json',
			"url": "/content/client/init",
			"type": "POST"
		};

		var columns = [{
				"data": "shortName"
			}
		]

		var customized = {
			"columns": columns,
			"ajax": dataTableAjax
		}

		d.init(customized);

		var table = $('#example').DataTable();

	});
}
