class Order {
	constructor() {
		this.initData();
		this.initEvent();
	}
	initData() {
		let self = this;
		let html = '';
		commonUtils.doAjax('/order/init', {}, function (resp) {
			resp.data.forEach(function (item, index, array) {
				html += '<option data-tokens="' + item[0] + '" value ="' + item[0] + ' title="'+item[1]+'">'+item[0]+'-'+ item[1] + '</option>';
			});
			$('#client').append(html);
			$('.selectpicker').selectpicker('refresh');

			self._clientOptions = html;
		});
	}
	initEvent() {
		 $('body').keyup(function(e) {
		    var code = e.keyCode || e.which;
		    if (code == '9') {
		    	let dropdown = ('dropdown' === event.target.getAttribute('data-toggle')) ? true : false;
		    	let id = event.target.getAttribute('data-id')
		    	if(dropdown){
		    		event.target.click();
		    	}
		    }
		 });
	}
}
let o = new Order();
