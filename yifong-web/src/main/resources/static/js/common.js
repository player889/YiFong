$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value.trim() || '');
		} else {
			o[this.name] = this.value.trim() || '';
		}
	});

	$.each(o, function(key, value) {
		if (value === "" || value === null) {
			delete o[key];
		}
	});

	return o;
};

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
	    data : JSON.stringify($(data).serializeJSON(serializeSettings)),
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