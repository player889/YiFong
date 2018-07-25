{
	class Client {
		constructor() {
		}
		
		getQData(){
			let src = {};
			src.shortName = $('#shortName').val();
			src.draw = 1;
			src.length = 10;
			src.start = 1;
			return src;
		}
		
		query(dataTable){
			
			$("#example").DataTable().clear();
			$("#example").DataTable().destroy();
			
				dataTable.setAjax("/content/client/init", this.getQData());
				dataTable.initDataTable();
				
			$("#example").DataTable();

		}
	}

	$(document).ready(function () {
		
		let client = new Client();
		
		let src = {};
			src.shortName = $('#shortName').val();
			src.draw = 1;
			src.length = 10;
			src.start = 1;
		
		var columns = [{"data": "shortName"}];

		let dataTable = new DataTable(columns, "/content/client/init", src);
			dataTable.initDataTable();
			
		let table = $("#example").DataTable();

		var header = $("meta[name='_csrf_header']").attr("content");
		var token = $("meta[name='_csrf']").attr("content");
		
		$('#query').on("click", function(){
			client.query(dataTable);
		});	
		
	});
}
