class Order {
	constructor() {
		this.initEvent();
		this.initData()
	}
	initData(){
		this._areaCharge = ["基隆", "基隆-台中", "基隆-彰化", "台北港", "桃園", "觀音", "楊梅", "湖口", "台中", "台中-銅鑼", "台中-彰化", "嘉義", "高雄"];
	}
	initEvent() {

		$('body').keyup(function (e) {
			var code = e.keyCode || e.which;
			if (code == '9') {
				let dropdown = ('dropdown' === event.target.getAttribute('data-toggle')) ? true : false;
				if (dropdown) {
					event.target.click();
				}
			}
		});

		let self = this;
		$('#client').on('change', function () {
			commonUtils.doAjax('/order/client/charges', { no: $('#client').val() }, function (resp) {
				let usedArea = _.map(resp.data, function(currentObject) {
					return parseInt(currentObject.dest);
				});
				usedArea.forEach(function(item){
					console.log(self._areaCharge[item]);
				});
			});
		});

		$('.datepicker').datepicker({
			language: "zh-TW",
			defaultDate: new Date(),
			startDate: new Date(),
			todayHighlight: true,
			autoclose: true,
			format: 'yyyy/mm/dd',
			enableOnReadonly: true
		});

	}
}
let o = new Order();


// if(undefined != resp.data){
// let usedArea = _.map(resp.data, function(currentObject) {
// return parseInt(currentObject.dest);
// });
// $('#leadingYard > option, #junctionYard > option').each(function(){
// let area = parseInt($(this).data("area"));
// $(this).prop("disabled" , !usedArea.includes(area));
// });
//	
// }else{
// $('#leadingYard > option, #junctionYard > option').each(function(){
// $(this).prop("disabled" , false);
// });
// }
//
// $('#leadingYard, #junctionYard').selectpicker({
// hideDisabled: true
// });
//
// $('#leadingYard, #junctionYard').selectpicker('refresh');
