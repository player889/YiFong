class DataTable {

	constructor(columns, url, data) {
		this._defaultSettings = this.getDefaultSettings(columns);
		this.initAjax(url, data);
		this.initDataTable();
	}

	initAjax(url, vo) {
		if (2 == arguments.length) {
			var header = $("meta[name='_csrf_header']").attr("content");
			var token = $("meta[name='_csrf']").attr("content");

			$.extend(this._defaultSettings, {
				"ajax": {
					"headers": {
						header: token
					},
					data: function (data) {
						return JSON.stringify(vo);
					},
					"contentType": 'application/json',
					"url": url,
					"type": "POST",
					"dataSrc": function (resp) {
						return (typeof resp.data == "undefined")  ? [] : resp.data;
					}
				}
			});
		}
	}

	initDataTable() {
		$.extend(true, $.fn.dataTable.defaults, this._defaultSettings);
	}

	getDefaultSettings(columns) {
		return {
			"fixedHeader": true,
			"ordering": false,
			"responsive": true,
			"scrollCollapse": true,
			"scrollY": '100vh',
			// "autoWidth": false, //禁用自动调整列宽
			"pagingType": "simple",
			"dom": "<'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
			"language": {
				"processing": "處理中...",
				"loadingRecords": "載入中...",
				"lengthMenu": "顯示 _MENU_ 項結果",
				"zeroRecords": "沒有符合的結果",
				"info": "顯示第 _START_ 至 _END_ 項結果，共 _TOTAL_ 項",
				"infoEmpty": "顯示第 0 至 0 項結果，共 0 項",
				"infoFiltered": "", //"(從 _MAX_ 項結果中過濾)",
				"infoPostFix": "",
				"search": "搜尋:",
				"emptyTable": "查無資料",
				"paginate": {
					"first": "第一頁",
					"previous": "上一頁",
					"next": "下一頁",
					"last": "最後一頁"
				},
				"aria": {
					"sortAscending": ": 升冪排列",
					"sortDescending": ": 降冪排列"
				}
			},
			"serverSide": true,
			"processing": true,
			"columns": columns
		}
	}
}
