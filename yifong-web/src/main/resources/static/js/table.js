$(function () {
	function queryParams(params) {
	    var param = {
	    	    queryParamsType:'',     
	    	    ////默认为空时传递  
	    	//sortOrder:desc  
	    	//pageSize:10  
	    	//pageNumber:2 
	    	    
	    	    
//	        limit : this.limit, // 頁面大小
//	        offset : this.offset, // 頁碼
//	        pageIndex : this.pageNumber,
//	        pageSize : this.pageSize
	    }
	    console.log(param);
	    return param;
	} 

	var defaultSettings = {
		 //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        //设置为limit可以获取limit, offset, search, sort, order
//        queryParamsType : "undefined",
//		queryParamsType: 'limit',
//		classes: 'table',
		sidePagination: "server",
		sortable: false,
		cache: false,
		pagination: true,
		striped: true,
		pageNumber: 1,
		showRefresh: true,
		search: true,
		onPageChange: function (currentPage, pageSize) {
			console.log("目前頁數:" + currentPage + ",一頁顯示:" + pageSize + "筆");
		},
		formatRecordsPerPage: function (pageSize) {
			return '';
		},
		icons: {
			refresh: 'fas fa-sync',
//			paginationSwitchDown: 'glyphicon-collapse-down icon-chevron-down',
//			paginationSwitchUp: 'glyphicon-collapse-up icon-chevron-up',
//			toggle: 'glyphicon-list-alt icon-list-alt',
//			columns: 'glyphicon-th icon-th',
			detailOpen: 'glyphicon-plus icon-plus',
			detailClose: 'glyphicon-minus icon-minus'
		},
		onRefresh: function () {
			console.log("XXX");
		}
	}
	
	
	$.extend(true, jQuery.fn.bootstrapTable.defaults, defaultSettings);
});