{
	class Client {
		constructor() {}
		
		query(){
			

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
		let table = $("#example").DataTable();

		var header = $("meta[name='_csrf_header']").attr("content");
		var token = $("meta[name='_csrf']").attr("content");
		
		$('#query').on("click", function(){
			
			$("#example").DataTable().clear();
			$("#example").DataTable().destroy();
			
			let src = {};
				src.shortName = $('#shortName').val();
				src.draw = 1;
				src.length = 10;
				src.start = 1;
			
			let dataTable = new DataTable(columns, "/content/client/init", src);
			let table = $("#example").DataTable();
			
		});	
		
	});
}
