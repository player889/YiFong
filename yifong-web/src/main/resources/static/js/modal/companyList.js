$(function() {
	$("#exampleModalCenter").modal();

	$('#exampleModalCenter').on('hidden.bs.modal', function(e) {
		$('#content').empty();
	});

});