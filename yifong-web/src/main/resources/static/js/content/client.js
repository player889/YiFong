{
	class Client {
		constructor() {

			var lan = {
				"processing": "處理中...",
				"loadingRecords": "載入中...",
				"lengthMenu": "顯示 _MENU_ 項結果",
				"zeroRecords": "沒有符合的結果",
				"info": "顯示第 _START_ 至 _END_ 項結果，共 _TOTAL_ 項",
				"infoEmpty": "顯示第 0 至 0 項結果，共 0 項",
				"infoFiltered": "(從 _MAX_ 項結果中過濾)",
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
			};

			var header = $("meta[name='_csrf_header']").attr("content");
			var token = $("meta[name='_csrf']").attr("content");
			
			var data = 

			$.extend(true, $.fn.dataTable.defaults, {
				"fixedHeader": true,
				"dom": "<'row'<'col-sm-12 col-md-6'f>>" +
				"<'row'<'col-sm-12'tr>>" +
				"<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
				"pagingType": "simple",
				"ordering": false,
				"responsive": true,
				"scrollY": '100vh',
				"scrollCollapse": true,
				"language": lan,
				//			     "autoWidth": false,  //禁用自动调整列宽
				"columns": [{
						"data": "shortName"
					},
				],

				"serverSide": true,
				"processing": true,
				"ajax": {
					"headers": {
						header: token
					},
					
					
					
//					{
//						"draw": 1,
//						"start": 0,
//						"length": 10,
//					}

					
					   data:function(data){
						    let obj = {};
						    	obj.shortName=$('#shortName').val();
						    	obj.draw = 1;
						    	obj.length = 10;
						    	obj.start = 1;
						    	return JSON.stringify(obj);
						    },
					
				
					"contentType": 'application/json',
					"url": "/content/client/init",
					"type": "POST",
//					   dataFilter: function(data){
//				            var json = jQuery.parseJSON( data );
//				            json.recordsTotal = json.total;
//				            json.recordsFiltered = json.total;
//				            json.data = json.list;
//				 
//				            return JSON.stringify( json ); // return JSON string
//				        }
				}
			});

		}

	}

	$(document).ready(function () {
		let client = new Client();

		var table = $('#example').DataTable();
		$(".dataTables_filter").hide();
		
	});
}
