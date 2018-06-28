$.fn.enterKey = function(fnc) {
	return this.each(function() {
		$(this).keypress(function(ev) {
			var keycode = (ev.keyCode ? ev.keyCode : ev.which);
			if (keycode == '13') {
				fnc.call(this, ev);
			}
		})
	})
};

var commonUtils = {
    getValue : function(val) {
	    return (typeof val === 'undefined') ? '' : val;
    },
    getSkypIcon : function() {
	    return '<a href="skype:echo123?call"><img src="images/skype.png" width="20" height="20"/></a>';
    },
    toCurrency : function(str) {
	    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    isNotEmpty : function(val) {
	    return ('' === val || 0 === parseInt(val)) ? true : false;
    }
}

var doAjax = function(url, data, successFn, extraData) {

	var serializeSettings = {
	    parseNumbers : true,
	    skipFalsyValuesForTypes : [ "string", "number" ],
	    parseWithFunction : function(val, inputName) {
		    return ("" === val || 0 === val) ? null : val;
	    }
	};

	var header = $("meta[name='_csrf_header']").attr("content");
	var token = $("meta[name='_csrf']").attr("content");

	$.ajax({
	    url : url,
	    type : 'POST',
	    contentType : 'application/json; charset=utf-8',
	    dataType : 'json',
	    data : (typeof data === 'object') ? JSON.stringify(data) : JSON.stringify($(data).serializeJSON(serializeSettings)),
	    beforeSend : function(xhr, settings) {

		    xhr.setRequestHeader(header, token);

		    if (false === $.isEmptyObject(extraData)) {
			    settings.data = JSON.parse(settings.data);
			    let key = Object.keys(extraData)[0];
			    let json = (undefined === settings.data[key]) ? settings.data : settings.data[key];
			    _.extend(json, extraData[key]);
			    settings.data = JSON.stringify(settings.data);
		    }

	    },
	    success : function(data) {
		    if (!data.code.startsWith("S")) {
			    alert("!" + data.message);
		    } else {
			    if (typeof successFn === "function") {
				    successFn(data);
			    } else {
				    alert(data.message);
			    }

		    }
	    },
	    error : function(jqXHR, exception) {
		    if (200 != jqXHR.status) {
			    alert("系統錯誤");
		    }
	    }
	});
}

var doModal = function(url, data, contentId) {

	var header = $("meta[name='_csrf_header']").attr("content");
	var token = $("meta[name='_csrf']").attr("content");

	$.ajax({
	    url : url,
	    type : 'POST',
	    dataType : 'html',
	    data : JSON.stringify(data),
	    contentType : "application/json",
	    beforeSend : function(xhr, settings) {
		    xhr.setRequestHeader(header, token);
	    },
	    success : function(data) {
		    $(contentId).html(data);
	    }
	});

};