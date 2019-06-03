function json_to_tabulator_fields(obj)
{
    var json_columns = '['

    for(var k in obj[0]){
        json_columns += '{"title":"'+k+'","field":"'+k+'","headerFilter":"input","editor":true},' 
    }
    json_columns = json_columns.substring(0, json_columns.length-1)+']'

    return json_columns
}



function json_to_tabulator_data(obj)
{
    var json_data = '['
    for(var o in obj ){
        json_data += '{'
        for(var k in obj[o]){
            json_data += '"'+k+'":"'+obj[o][k]+'",'
        }
        json_data = json_data.substring(0, json_data.length-1) + '},'
    }
    json_data = json_data.substring(0, json_data.length-1)+']'

    return json_data
}



function json_to_mysql_fields(obj)
{
    var index = 0;
    var columns = []

    for(var k in obj[0]){
        columns[index] = k
        index++;
    }

    return columns
}


//
// USAGE : str = remove_chars([';','`'],"F;R`O;M`")
function remove_chars(chars, str){
    var new_srt = ""

    for(var index in [...str]){
        if(!chars.includes(str[index])){
            new_srt += str[index]
        }
    }

    return new_srt
}



function delete_row(x,row){
    console.log("DELETE :")
    console.log(x)
    for(var obj in x)
        console.log(obj+" : "+x[obj])   
    row.delete()


    // Delete field from database 
    // ------------------------------------------------

    // get primary column name 
    var TABLE_SCHEMA = database_conf
    var TABLE_NAME = query_parsed.table_name
    var query = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '"+TABLE_SCHEMA+"' AND TABLE_NAME = '"+TABLE_NAME+"' AND COLUMN_KEY = 'PRI';"
    var res = mysql_query(query)
    res.then((successMessage) => {
        var PRI_KEY = successMessage[0].COLUMN_NAME
        
        // delete query
        var delete_query = "DELETE FROM "+TABLE_NAME+" WHERE "+PRI_KEY+"='"+x[PRI_KEY]+"';"
        console.log(delete_query)
        var del = mysql_query(delete_query)
        del.then((successMessage) => {
            console.log(successMessage)
        });

    });
}




function update_row(x, rows){
    console.log("SAVE :")
    // console.log(rows)
    console.log(x)
    for(var obj in x)
        console.log(obj+" : "+x[obj])   

    
    // Update field to database 
    // ------------------------------------------------

    // get primary column name 
    var TABLE_SCHEMA = database_conf
    var TABLE_NAME = query_parsed.table_name
    var query = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '"+TABLE_SCHEMA+"' AND TABLE_NAME = '"+TABLE_NAME+"' AND COLUMN_KEY = 'PRI';"
    var res = mysql_query(query)
    res.then((successMessage) => {
        var PRI_KEY = successMessage[0].COLUMN_NAME

        // BULD UPDATE QUERY
        // --------------------------------------------
        var update_query = "UPDATE "+TABLE_NAME+" SET"
        var updates = ""
        var append = " WHERE "+PRI_KEY+"='"+x[PRI_KEY]+"';"
        for(var obj in x)
            updates += " "+obj+" = '"+x[obj]+"',"

        update_query += updates.substring(0, updates.length-1) + append ;

        console.log(update_query)
        var del = mysql_query(update_query)
        del.then((successMessage) => {
            console.log(successMessage)
        });

    });
}