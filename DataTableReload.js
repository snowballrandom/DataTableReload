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
 * @name DataTableReload
 * @summary Allows for reloading the datatable with new param
 * @author Kyle Coots
 * @date 4-10-2022
 * @namespace DataTableReload
 * @copyright Kyle Coots
 * @version 1.0
 */
class DataTableReload {
	
	/**
	 * Url for the ajax request
	 * @type string
	 */	
	#url = '';
	/**
	 * Request Method for the ajax request.
	 * @type string
	 */	
	#method = 'POST';	
	/**
	 * Options used for the DataTable
	 * @type object
	 */
	#dtOptions = {};
	/**
	 * Responseive Table
	 * @type boolean
	 */
	#responsive = true;
	/**
	 * Table Page Length
	 * @type interger
	 */
	#pageLength = 10;
	/**
	 * Table Page Length Menu
	 * @type array
	 */	
	#lengthMenu = [5, 10, 20];
	/**
	 * Table Processing
	 * @type boolean
	 */	
	#processing = true;
	/**
	 * Table Use Server Side
     * @type boolean 
	 */	
	#serverSide = true;
	/**
	 * Table Language Options
     * @type object
	 */	
	#language = {};	
	/**
	 * Table Initalization Complete
     * A function that allows for processing after 
     * the table has loaded
     * @type function
	 */	
	#initComplete;
	/**
	 * Table Columns
     * @type array
	 */	
	#columns = [];
	/**
	 * Table Column Definitions
     * @type array 
	 */	
	#columnDefs = [];
	/**
	 * Table Ajax Param 
     * @type object
	 */
	ajaxParam;
	/**
	 * Table ID String
	 */	
	tableEl;
	/**
	 * DataTable Object 
     * Will hold the DataTable object of the returned 
     * created table
	 */	
	tableDt;
	
	/**
	 * Set the url to be used in the request
     * @param url string
	 */
	setURL(url){
		this.#url = url
	}
	/**
	 * Set the pagelength
     * @param pageLengthInt interger
	 */	
	setPageLength(pageLengthInt){
		if(pageLengthInt == 'undeinfed'){
		  this.#pageLength = 10;
		}else if(typeof pageLengthInt == "number"){
		  this.#pageLength = pageLengthInt;
		}else{
		  console.log('Colums should be of type Array');
		}
	}
	/**
	 * Set the columns to be used in the datatable
     * @param columnsArray array
	 */	
	setColumns(columnsArray){
		if(columnsArray == 'undefined'){
		  this.#columns = [];
		}else if(typeof columnsArray == "object" && true == Array.isArray(columnsArray)){
		  this.#columns = columnsArray;
		}else{
		  console.log('Colums should be of type Array');
		}
	}
	/**
	 * Set the columns definitions to be used in the datatable
     * @param columnDefsArray array
	 */		
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
	/**
	 * Set the language options for the datatables
     * @param language object
	 */		
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
	/**
	 * Set the function for the initalization complete
     * @param func function
	 */			
	setInitComplete(func){				
		this.#initComplete = function(settings, json){
			if(typeof func == "function"){
			  func(settings,json);
			}
		}
	}
	/**
	 * Set the ajax request params to be used with the request
     * @param param object
	 */			
	setParam(param){ 
	  this.ajaxParam = param;
	}
	/**
	 * Returns the ajax request params to be used with the request
     * @return object
	 */	
	getParam(){		
		return this.ajaxParam;
	}
	/**
	 * Builds the ajax request object to be used with the request
     * @param param object
	 * @param dataSource string set the server returned object to use for the table
	 */		
	makeAjax(param, dataSource='data.result'){
	  dtReload.param = param;
	  return {
		url:this.#url,
		dataSrc:dataSource,
		data:function(d){	
		  dtReload.processParam(d, dtReload.param)
		},
		method:this.#method
	  }
	}	
	/**
	 * Sets the options to be used for building the DataTable
     * @see #dtOptions
	 */		
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
	/**
	 * Sets and then returns the options to be used for building the DataTable 
     * @see #dtOptions
	 * @see #setOptions()
	 */			
	getOptions(){
	  this.#setOptions();
	  return this.#dtOptions;
	}
	/**
	 * Set the param to be used with the request
     * This is used for reloads of the same table.
     * @param param object
	 * @see dtReload.param
	 */		
	setReloadParam(param){
		dtReload.param = param;	
	}
	/**
	 * Get the param to be used with the request
     * This is used for reloads of the same table.
	 * @see dtReload.param
     * @returns dtReload.param
	 */	
	getReloadParam(){
		return dtReload.param;	
	}
	/**
	 * Creates the DataTable using the DataTable object.
     * You only need to pass in the name id of the table element.
     * This will return the table object that DataTables.js creates 
     * @param el string
     * @returns tableDt object
	 */	
	create(el){
	  this.tableEl = el;
	  this.tableDt = $(this.tableEl).DataTable(this.getOptions());
	    
	  return this.tableDt;
	}
}

window.DataTableReload = DataTableReload;

})();
