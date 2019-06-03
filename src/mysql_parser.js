function mysql_parser(query){
    
    
    var parsed_query = {
        words : query.split(" "),
        table_name: "",
        type: ""
    };

    // QUERY TYPE
    // -----------------------------------------------------------------
    parsed_query.type = parsed_query.words[0]

    // TABLE NAME 
    // -----------------------------------------------------------------
    for(var word in parsed_query.words){
        if(parsed_query.words[word] == "FROM"){
            parsed_query.table_name =  remove_chars([';','`'],parsed_query.words[parseInt(word)+1]);
        }
    }

    // GET PRIMARY KEY OF TABLE ???
    // -----------------------------------------------------------------
    


    // HOLD THE 'AS' TABLE OF SELECT QUERY
    if(parsed_query.type == 'select' || parsed_query.type == 'SELECT'){
        if(DEBUG) console.log("The type of query is : " + parsed_query.type)
        
        //
        //
        //
        //
        //
    }
        

    return parsed_query ;
}

