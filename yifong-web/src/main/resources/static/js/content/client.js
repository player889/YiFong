{
	const INIT_URL = "/content/client/init";
	const INIT_QUERY = "/content/client/query";

	class Client {

		constructor() {}

		getQData() {
			let src = {};
				src.shortName = $('#shortName').val();
			return JSON.stringify(src);
		}

		doQuery() {
		}
		
		ajaxFn(params) {
			$.ajax({
				url: INIT_URL,
				type: 'POST',
				contentType: 'application/json; charset=utf-8',
				dataType: 'json',
				data: JSON.stringify({shortName:""}),
				success: function (data) {
					params.success(data);
				}
			});
//			 main.doPost(INIT_URL, JSON.stringify({shortName:""}), function(data){
//				 params.success(data);
//			 });
		}
		
		getColumns(){
			let array = {
				"公司簡稱" : "shortName",
				"電話" : "phone",
				"統一編號" : "guiNumber",
				"地址" : "address"
			};
			
			const columns = [];
			for (const key of Object.keys(array)) {
				const rObj  = {};
					rObj.title= key;
					rObj.field= array[key];
				columns.push(rObj);
			}
			return columns;
		}
		
		buildTable($el, cells, data) {
			 var i, j, row, columns = [], data = [];
		     for (i = 0; i < cells; i++) {
		         columns.push({
		             field: 'field' + i,
		             title: 'Cell' + i,
		             sortable: true
		         });
		     }
		     for (i = 0; i < rows; i++) {
		         row = {};
		         for (j = 0; j < cells; j++) {
		             row['field' + j] = 'Row-' + i + '-' + j;
		         }
		         data.push(row);
		     }
		     $el.bootstrapTable({
		         columns: columns,
		         data: data,
		         detailView: cells > 1,
		         onExpandRow: function (index, row, $detail) {
		             expandTable($detail, cells - 1);
		         }
		     });
		}
	}

	$(document).ready(function () {
		let client = new Client();
		$('#demo').bootstrapTable({
			ajax: client.ajaxFn,
			columns: client.getColumns(),
			detailView: true,
			onExpandRow: function(index, row, $detail) {
				$('.detail-icon').eq(index).find('[data-fa-i2svg]').removeClass("fas fa-plus").addClass('fas fa-minus');
		    
	            //这一步就是相当于在当前点击列下新创建一个table
	            var cur_table = $detail.html('<table></table>').find('table');
	            var html = "";
	            html += "<table class='table'>";
	            html += "<thead>";
	            html += "<tr style='height: 40px;'>";
	            html += "<th>用户id</th>";
	            html += "<th>用户姓名</th>";
	            html += "</tr>";
	            html += "</thead>";
                html += "<tr  align='center'><td>1</td><td>2</td></tr>";
                html += '</table>';
                $detail.html(html); // 关键地方
			},
			onCollapseRow : function(index, row){
				$('.detail-icon').eq(index).find('[data-fa-i2svg]').removeClass("fas fa-minus").addClass('fas fa-plus');
			},
		   onClickRow: function(row, element){
			   	$(element[0]).find('[data-fa-i2svg]')
		        .toggleClass('fas fa-minus')
		        .toggleClass('fas fa-plus').end()
		        .find('.detail-icon').triggerHandler("click");
		    }
		});

	});

	
}