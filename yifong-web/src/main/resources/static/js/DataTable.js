$(function () {
	var settings = {
		"retrieve": true,
		"ordering": false,
		"autoWidth": true,
		"responsive": true,
		"fixedHeader": true,
		"scrollCollapse": true,
		"scrollY": '100vh',
		"pagingType": "simple",
		"dom": "<'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
		"language": {
			"processing": "處理中...",
			"loadingRecords": "載入中...",
			"sInfoThousands": ",",
			"lengthMenu": "顯示 _MENU_ 項結果",
			"zeroRecords": "沒有符合的結果",
			"info": "第 _START_ 至 _END_ 項結果，共 _TOTAL_ 項",
			"infoEmpty": "第 0 至 0 項結果，共 0 項",
			"infoFiltered": "", // "(從 _MAX_ 項結果中過濾)",
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
		}
	}
	$.extend(true, $.fn.dataTable.defaults, settings);
});
