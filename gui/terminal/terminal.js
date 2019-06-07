// GLOBAL VARIABLES 
var gl_table_mame =""
var gl_table_fields = []


// PRINT TABLE CONTENTS IN TABULATOR OBJECT
// ----------------------------------------------------------------------------
function table_print(sql_query)
{
    // Show on editor the generated MySQL query that has been executed 
    editor.setValue(sql_query, 1)   

    // Execute Query
    var ret = mysql_select(sql_query);
    ret.then((return_msg) => {
        
        // convert the return object for sql query to JSON format
        obj = JSON.parse(return_msg);

        // CONVERT JSON DATA FOR TABULATOR INPUT
        // ----------------------------------------------------------
        var json_columns = '['
        for(var k in obj[0]){
            json_columns += '{"title":"'+k+'","field":"'+k+'","editor":true},' 
        }
        json_columns = json_columns.substring(0, json_columns.length-1)+']'

        var json_data = '['
        for(var o in obj ){
            json_data += '{'
            for(var k in obj[o]){
                json_data += '"'+k+'":"'+obj[o][k]+'",'
            }
            json_data = json_data.substring(0, json_data.length-1) + '},'
        }
        json_data = json_data.substring(0, json_data.length-1)+']'
        // ----------------------------------------------------------

        // Tabulator call 
        tabulator_f(JSON.parse(json_columns),(JSON.parse(json_data)))
    });
}
// ----------------------------------------------------------------------------




// SELECT TABLE DROP-DOWN MENU CLICK FUNCTION
// ------------------------------------------------------------------
function table_select_dropdown_click(element)
{
    gl_table_mame = element.innerHTML
    var sql_query = `SELECT * FROM ${gl_table_mame} ; `
    // Show results on Table
    table_print(sql_query);
    
    
    // Display the selected table on dropdown button
    document.getElementById("dropdownMenuButton").innerHTML = gl_table_mame;
    
    table_fields_checkboxes();
    
}



// ------------------------------------------------------------------
function table_fields_checkboxes()
{
    var sql_query = `SELECT * FROM ${gl_table_mame} LIMIT 1 ;`
    var ret = mysql_select(sql_query);
    
    ret.then((return_msg) => {
        obj = JSON.parse(return_msg);
        var json_columns = json_to_mysql_fields(obj)
        gl_table_fields = json_columns
        console.log(gl_table_fields)
        var html_checkbox = ""
        for(var i in json_columns){
            html_checkbox += `<div class="custom-control custom-checkbox">
            <input type="checkbox" onclick="field_checkboc_click(this)" class="custom-control-input" id="${json_columns[i]}" checked>
            <label class="custom-control-label" for="${json_columns[i]}">${json_columns[i]}</label>
            </div>`
        }
        $('#table_fields_check_boxes_content').html(html_checkbox)

        document.getElementById("table_fields_check_boxes").style.display = "block";
    });
}
// ------------------------------------------------------------------



// ------------------------------------------------------------------
function field_checkboc_click(element)
{
    // element.val = element.checked ? 1 : 0
    if(!document.getElementById(element.id).checked){
        gl_table_fields = delete_item_from_array(gl_table_fields,element.id)
    }else{
        gl_table_fields.push(element.id)
    }

    var fields = ""
    for( var i = 0; i < gl_table_fields.length; i++){ 
        fields += `${gl_table_fields[i]},`
    }
    fields = fields.substring(0, fields.length-1)

    query = `SELECT ${fields} FROM ${gl_table_mame} ;`
    table_print(query)
}
// ------------------------------------------------------------------




// SELECT MYSQL BUTTON EXECUTION AND DISPLAY RESULTS ON TABLE
// ------------------------------------------------------------------
$('#button_exec').click(function() {
    let sql_query = $(".ace_text-layer").text();
    table_print(sql_query)
});
// ------------------------------------------------------------------








// QUERY BUILD - GENERATEOR
// ------------------------------------------------------------------
var sql_query = "SELECT table_name FROM information_schema.tables where table_schema='test';";
var ret = mysql_select(sql_query);
ret.then((return_msg) => {
    obj = JSON.parse(return_msg);


    var dropdown_list = ""
    for(var k in obj){
        dropdown_list += `<a <button onclick="table_select_dropdown_click(this)" class=\"dropdown-item table_selected_dd\" href=\"#\"> ${obj[k].table_name} </a>`
    }


    $('#table_dropdown').html(dropdown_list)
});




