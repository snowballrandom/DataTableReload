;(function (){ 
	
'use strict';

/**
 * dtReload is used for setting new param 
 * to send to the server with out having 
 * to reload the table
 */
var dtReload = {};
/**
 * This is the object containing
 * the param to be sent to the server 
 */
dtReload.param = {};
/**
 * Adds the param to the object used by datatables
 * for the request
 * @param param object datatables object
 * @param extra object extra params to send to the server
 * @return object
 */
dtReload.processParam = (param, extra) => {
  $.each(extra, function(i,e){
	param[i] = e;
  })
  return param;
}
/**
 * Build DataTable
 * Builds the settings for datatables.js
 */
class DataTableReload {
	
	#url = '';
	#method = 'POST';
	
	#dtOptions = {};
	#responsive = true;
	#pageLength = 10;
	#lengthMenu = [5, 10, 20];
	#processing = true;
	#serverSide = true;
	#language = {};	
	#initComplete;
	#columns = [];
	#columnDefs = [];

	ajaxParam;
	tableEl;
	tableDt;
		
	constructor(){
	}
	
	setURL(url){
		this.#url = url
	}
	
	setPageLength(pageLengthInt){
		if(pageLengthInt == 'undeinfed'){
		  this.#pageLength = 10;
		}else if(typeof pageLengthInt == "number"){
		  this.#pageLength = pageLengthInt;
		}else{
		  console.log('Colums should be of type Array');
		}
	}
	
	setColumns(columnsArray){
		if(columnsArray == 'undefined'){
		  this.#columns = [];
		}else if(typeof columnsArray == "object" && true == Array.isArray(columnsArray)){
		  this.#columns = columnsArray;
		}else{
		  console.log('Colums should be of type Array');
		}
	}
	
	setColumnDefs(columnDefsArray){
		if(language == 'undefined'){	
			this.#columnDefs = [
        	  { targets: 'no-sort', orderable: false }
        	]	
		}else if(typeof columnDefsArray == "object" && true == Array.isArray(columnDefsArray)){
			this.#columnDefs = columnDefsArray;
		}else{
			console.log('Coulmn Definitions should be of type Array');
		}
	}
	
	setLanguage(language){
		if(language == 'undefined'){
		  this.#language = {
			infoEmpty: "No Data To Display",
            emptyTable: "No Data To Display",
            zeroRecords: "No Data To Display"
		  }
		}else if(typeof language == "object" && false == Array.isArray(language)){
			this.#language = language;
		}else{
			console.log('Language should be of type object');
		}
	}
	
	setInitComplete(func){				
		this.#initComplete = function(settings, json){
			if(typeof func == "function"){
			  func(settings,json);
			}
		}
	}
	
	setParam(param){ 
	  this.ajaxParam = param;
	}
	
	getParam(){		
		return this.ajaxParam;
	}
	
	makeAjax(param){
	  dtReload.param = param;
	  return {
		url:this.#url,
		dataSrc:'data.result',
		data:function(d){	
		  dtReload.processParam(d, dtReload.param)
		},
		method:this.#method
	  }
	}	
	
	#setOptions(){		
		this.#dtOptions = {			
			responsive:this.#responsive,
			pageLength:this.#pageLength,
			lengthMenu:this.#lengthMenu,
			processing:this.#processing,
			serverSide:this.#serverSide,
			language:this.#language,
			ajax:this.makeAjax(this.getParam()),
			initComplete:this.#initComplete,
			columns:this.#columns,
			columnDef:this.#columnDefs			
		}	
	}
	
	getOptions(){
	  this.#setOptions();
	  return this.#dtOptions;
	}
	
	setReloadParam(param){
		dtReload.param = param;	
	}
	
	getReloadParam(){
		return dtReload.param;	
	}
		
	create(el){
	  this.tableEl = el;
	  this.tableDt = $(this.tableEl).DataTable(this.getOptions());
	    
	  return this.tableDt;
	}
}

window.DataTableReload = DataTableReload;

})();
