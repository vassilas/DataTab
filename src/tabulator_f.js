




function tabulator_f(columns,tabledata,options={delete_button:false,save_button:false})
{   
    // OPTIONS
    // -----------------------
    // delete_button:true
    // save_button:false
    // var options = {delete_button:true,save_button:false} 
    

    // EDIT BUTTONS ON TABLE 
    // ---------------------------------------------------------------------------------------
    var saveIcon = function(value, data, cell, row, options){ 
        return "<img class='editImage' src='img/diskette.png'>";
    };
    var deleteIcon = function(value, data, cell, row, options){ 
        return "<img class='editImage' src='img/delete.png'>";
    };
    if(options.save_button)
        columns.push({formatter:saveIcon, width:40, align:"center",headerSort:false,cellClick:function(e, cell){update_row(cell._cell.row.data, tabledata)}})
    if(options.delete_button)
        columns.push({formatter:deleteIcon, width:40, align:"center",headerSort:false,cellClick:function(e, cell){delete_row(cell._cell.row.data, cell._cell.row)}})
    // ---------------------------------------------------------------------------------------
    
    
    
    
    // console.log(columns)
    // console.log(tabledata)

    // TABULATOR 
    // ------------------------------------------------------------------------------------------------------
    //sample data
    // var tabledata = [
    //     {id:1, name:"Oli Bob"           , age:"12", col:"red", dob:"12/08/2017"},
    //     {id:2, name:"Mary May"          , age:"1", col:"blue", dob:"14/05/1982"},
    //     {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
    //     {id:4, name:"Brendon Philips"   , age:"125", col:"orange", dob:"01/08/1980"},
    //     {id:5, name:"Margret Marmajuke" , age:"16", col:"yellow", dob:"31/01/1999"},
    //     {id:6, name:"Oli Bob"           , age:"12", col:"red", dob:"12/08/2017"},
    //     {id:7, name:"Mary May"          , age:"1", col:"blue", dob:"14/05/1982"},
    //     {id:8, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
    //     {id:9, name:"Brendon Philips"   , age:"125", col:"orange", dob:"01/08/1980"},
    //     {id:10, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
    //     {id:11, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
    //     {id:12, name:"Oli Bob"          , age:"12", col:"red", dob:"12/08/2017"},
    //     {id:13, name:"Mary May"         , age:"1", col:"blue", dob:"14/05/1982"},
    //     {id:14, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
    //     {id:15, name:"Brendon Philips"  , age:"125", col:"orange", dob:"01/08/1980"},
    //     {id:16, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
    // ];

    // var tabledata = [{date_in:"2012-01-05T00:00:00.000Z",date_out:"2012-01-05T00:00:00.000Z",id_inout:1,malfunction:"DEN BOOTAREI KATHOLOU",system:"CZC9025YP5"}];
    // var columns = [ //Define Table Columns
    //     {"title":"ID", "field":"id", "sorter":"number","width":20,editor:false},
    //     {"title":"Name", "field":"name", sorter:"string", "width":150,"editor":true},
    //     {"title":"Age", "field":"age", sorter:"number", align:"left", formatter:"progress",editor:true},
    //     {"title":"Favourite Color", "field":"col", sorter:"string", sortable:false,"editor":true},
    //     {"title":"Date Of Birth", "field":"dob", sorter:"date", align:"center","editor":true},
    // ];


    // TABLE CREATION 
    // ------------------------------------
    table = new Tabulator("#example-table", {
        // height:$(document).height()*0.5, // set height of table to enable virtual DOM
        data:tabledata, //load initial data into table
        layout:"fitColumns", //fit columns to width of table (optional)
        columns:columns
    });
    // ------------------------------------


    
}

// Filter
// ------------------------------------
function updateFilter(field,search){    
    table.setFilter(field, "like", search);
}
// ------------------------------------

