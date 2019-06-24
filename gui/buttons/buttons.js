// Global Variables
var table           // the ui table from tabulator
var query_parsed     // The current selected table 




var json_ret = $.getJSON( "../APP-CONFIG.json", {
        format:"json"
    })
    .done(function() {
        
        // BUTTONS GENERATION FROM JSON APP-CONFIG.json FILE
        // -------------------------------------------------------
        var buttons_html_button = ""
        for(var k in json_ret.responseJSON.select_buttons){
            var query = json_ret.responseJSON.select_buttons[k].sql_query
            var button_name = json_ret.responseJSON.select_buttons[k].button_name
            buttons_html_button += '<button type="button" class="btn btn-secondary"'
            buttons_html_button += ' data-cmd="'+query+'"> '+button_name+'</button>';
        }
        $('#select-button-list2').html(buttons_html_button)
        // -------------------------------------------------------


        // SQL QUERIES AND TABLE BUILD 
        // ------------------------------------------------------------------------------
        $('#select-button-list2 button').click(function() {
            // MySQL SELECT QUERY 
            let command = $(this).data('cmd')
            var ret = mysql_select(command);
            
            // MySQL Parser
            // -----------------------------------------------------
            query_parsed = mysql_parser(command)
            // console.log("Table Name : "+query_parsed.table_name)
            // console.log("Query Type : "+ query_parsed.type)
            // console.log(mysql_get_pri_key('inout','emy'))
            // mysql_get_pri_key('inout','emy')
            
            // -----------------------------------------------------

            ret.then((successMessage) => {
                
                obj = JSON.parse(successMessage);
                // TABULATOR BUILD 
                // ------------------------------------------------------
                var json_columns = json_to_tabulator_fields(obj)
                var json_data = json_to_tabulator_data(obj)

                tabulator_f(JSON.parse(json_columns),(JSON.parse(json_data)),{delete_button:true,save_button:true})
                // ------------------------------------------------------
            });


            


            // Display buttons - Hide display form
            document.getElementById("buttons").style.display="block";
            document.getElementById("insert_html").style.display="none";
            document.getElementById("save_button").style.display="none";
        });
        //------------------------------------------------------------------------------
        
        
        // INSERT to SELECTed Table 
        // ------------------------------------------------------
        $("#insert_btn").click(function(){
            
            let command = "SELECT * FROM " + query_parsed.table_name + " LIMIT 1 ;"
            if(DEBUG) console.log("SELECT COMMAND for INSERT: " + command)
            var ret_2 = mysql_select(command);
            ret_2.then((successMessage) => {
                
                obj = JSON.parse(successMessage);
                
                var json_columns = json_to_mysql_fields(obj)
                if(DEBUG) console.log(json_columns)
                // INSERT FORM CREATION - GENERATION
                //--------------------
                var insert_html_start = "<div class=\"form-group row\">"
                var insert_html_form = ""
                var insert_html_end = "</div></div>"
                for(var i in json_columns){
                    insert_html_form += insert_html_start+"<label for=\""+json_columns[i]+"\" class=\"col-sm-2 col-form-label\">"+json_columns[i]+"</label>\
                                            <div class=\"col-sm-10\">\
                                                <input type=\"text\" name=\""+json_columns[i]+"\" class=\"form-control\" id=\""+json_columns[i]+"\" >"+insert_html_end
                }
                
                $("#generated_form").html(insert_html_form)
                //--------------------
                
                if(document.getElementById("insert_html").style.display=="block")
                {
                    document.getElementById("insert_html").style.display="none";
                    document.getElementById("insert_exec_button").style.display="none";
                    document.getElementById("save_button").style.display="none";
                }
                else
                {
                    document.getElementById("insert_html").style.display="block";
                    document.getElementById("insert_exec_button").style.display="block";
                    document.getElementById("save_button").style.display="block";
                }
            });
        });
        // ------------------------------------------------------
    })
    .fail(function() {
        console.log( "error" );
})



// Triger INSERT action to DataBase
$("#insert_exec_button").click(function(){

    var form_data = $('#insert_form').serializeArray()
    var columns = ""
    var values = ""
    var insert_query = ""

    // Generate SQL Insert Query 
    for(var i in form_data){
        columns += form_data[i].name + "," 
        values += "\""+form_data[i].value + "\","
    }
    columns =columns.substring(0, columns.length-1)
    values = values.substring(0, values.length-1)
    insert_query = "INSERT INTO `"+query_parsed.table_name+"`("+columns+") VALUES ("+values+");"
    
    if(DEBUG)console.log(insert_query)

    var ret_2 = mysql_query(insert_query);
    ret_2.then((successMessage) => {
        // console.log("Insert done")
    });
});




// Trigger download of data.csv file
$("#download-csv").click(function(){
    table.download("csv", "data.csv");
});

