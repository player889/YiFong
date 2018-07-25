{
	class Client {
		constructor() {
			this.columns = [{"data": "shortName"}];
			this.qUrl = "/content/client/init";
			this.doQuery();
		}
		
		getQData(){
			let src = {};
			src.shortName = $('#shortName').val();
			src.draw = 1;
			src.length = 10;
			src.start = 1;
			return JSON.stringify(src);
		}
		
		doQuery(){
			
			var header = $("meta[name='_csrf_header']").attr("content");
			var token = $("meta[name='_csrf']").attr("content");
			
			var header ={
				header: token
			};
			
			$('#example').DataTable().clear();
			$('#example').DataTable().destroy ();
			
			return $("#example").DataTable({
				"ajax": {
					"contentType": 'application/json',
					"url": "/content/client/init",
					"type": "POST",
					"dataSrc": function (resp) {
						return (typeof resp.data == "undefined")  ? [] : resp.data;
					},
					"headers": header,
					"data": this.getQData
				},
				"columns" :  [{"data": "shortName"}]
			});
		}
	}

	$(document).ready(function () {
		let client = new Client();
		$('#query').on("click", function(){
			client.doQuery();
		});
	});
}
