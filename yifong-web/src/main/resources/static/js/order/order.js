class Order {
	constructor() {
		this.initEvent();
		this.initData();
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
		$('#info-client').on('change', function () {
			commonUtils.doAjax('/order/client/charges', { no: $('#info-client').val() }, function (resp) {
				
//				console.log(resp.data);
//				
//				self._size = _.map(resp.data, function(currentObject) {
//					return currentObject.size;
//				});
//				
//				 $('#size > option').each(function(){
//					 let isDsiabled = self._size.includes(parseInt($(this).val())) ? false : true;
//					 $(this).prop("disabled" , isDsiabled);
//				 });
//				 $('#size').selectpicker({
//					hideDisabled: true
//				});
//				 $('#size').selectpicker('refresh');
//				 $("#size").selectpicker("val", $("#size option:enabled:first").val());
//				
//				let obj = $('#area');
//				if(false === $.isEmptyObject(resp.dat)){
//					resp.data.forEach(function(item){
//						obj.append('<option value="'+item.dest+'">'+self._areaCharge[item.dest]+'</option');
//					});
//					
//					obj.on("change", function(){
//						let o = resp.data[$(this).prop('selectedIndex') - 1];
//						$("#pay").val(o.pay);
//						$("#lyfee").val(o.fee);
//					});
//					$('#area').selectpicker('refresh');
//				}
			
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


//validator = new ContainerValidator();
//console.log(validator.isValid('TEXU3070079'));
//console.log(validator.isValid('TEXU3070070'));
//console.log(validator.isValid('YMLU8305416'));

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
