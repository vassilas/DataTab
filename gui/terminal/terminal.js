// mysql_connect();



// SELECT MYSQL BUTTON EXECUTION AND DISPLAY RESULTS ON TABLE
// ------------------------------------------------------------------
$('#button_exec').click(function() {
    let sql_query = $(".ace_text-layer").text();
    console.log(sql_query)
    



    // SELECT QUERY
    // --------------------------------------------------------------
    
    // execute query
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
});
// ------------------------------------------------------------------


