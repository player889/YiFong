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
//		showColumns: true,
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
            paginationSwitchDown: 'far fa-caret-square-down',
            paginationSwitchUp: 'far fa-caret-square-up',
            toggleOff: 'fas fa-toggle-off',
            toggleOn: 'fas fa-toggle-on',
            columns: 'fas fa-th-list',
            detailOpen: 'fas fa-plus',
            detailClose: 'fas fa-minus',
            fullscreen: 'fas fa-expand-arrows-alt'
		},
		onRefresh: function () {
			console.log("XXX");
		}
	}
	
	
	$.extend(true, jQuery.fn.bootstrapTable.defaults, defaultSettings);
});