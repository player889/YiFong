{
	class Client {
		constructor() {
			this.columns = [{"data": "shortName"}];
			this.qUrl = "/content/client/init"
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
			
			let table = $("#example").DataTable();
			
			table.clear();
			table.destroy();
			
			dataTable.setAjax(this.qUrl, this.getQData());
			dataTable.init("#example");
		}
	}

	$(document).ready(function () {
		
		let client = new Client();

		let dataTable = new DataTable(client.columns, client.qUrl, client.getQData());
			dataTable.init("#example");
		
		$('#query').on("click", function(){
			client.query(dataTable);
		});	
		
	});
}
