# DataTableReload
A simple way to reload DataTables.js with dynamic ajax parameters. 

This provides a way to pass datatables a set of parameters on initilization and then pass a new set of parameters without having to completely destroy and rebuild the table easily.

Example:

```javascript

myObject = {}
myObject.dtr = new DataTableReload();

myObject.showCustomer = (customer_id) => {
	
  // Set our parameters
  // The customer id may change everytime 
  myObject.dtr.setParam({
	 someParam : 'theParam',
 	 c_id:customer_id,
	 token : token_value
  });
  
  // Set the URL for DataTables to use
  myObject.dtr.setURL('https://myawesomewebsite/');
  
  // Set up our Columns
  myObject.dtr.setColumns([
    { "data": function(data){return myObject.dtListColumnProcess(data).customer_name} },
    { "data": function(data){return myObject.dtListColumnProcess(data).status} },
    { "data": "date" },
    { "data": "options" }	
  ]);
  
  // Check if the table has already been loaded
  if($.fn.dataTable.isDataTable(myObject.dtr.tableEl)){
    
    // Set the param for the reload
    myObject.dtr.setReloadParam(myObject.dtr.getParam());
	  
    // Reload the table with the new param
    myObject.dtr.tableDt.ajax.reload();
    
  }else{
  
    // Inital Creation of the table
    myObject.dtr.create('#myTableID');
    
  }
}
```
As you can see we can call the function showCustomer() and pass it a value of customer id and it will pass the new parameters to DataTables. Datatables will then use these new parameters and send them to the server without destroying the table.

Note Datables.js should be loaded ahead of this file.
