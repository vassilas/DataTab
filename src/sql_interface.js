function sql_inserts_gen()
{
    let sql_inserts = ""
    csv2sql.transform("table_name", fs.createReadStream('./files/test_contacts.csv')).on('data',function(sql){
        sql_inserts = sql_inserts + sql
        $('#sql_inserts').append(sql+'<br>')
    })
    
    
    //db.run(sql_inserts)

    // var res = db.exec("SELECT * FROM table_name")
    // $('#sql_inserts').append(JSON.stringify(res)+'<br>')
}

function sql_query(query)
{
    // Execute some sql
    // sqlstr = "CREATE TABLE hello (a int, b char);";
    // sqlstr += "INSERT INTO hello VALUES (0, 'hello');"
    // sqlstr += "INSERT INTO hello VALUES (1, 'world');"
    // db.run(sqlstr); // Run the query without returning anything

    var res = db.exec(query)
    var data = db.export()
    var buffer = new Buffer(data)
    fs.writeFileSync("./files/filename.sqlite", buffer)
    return res
    
    // $('#sql_inserts').append(JSON.stringify(res)+'<br>')
}

// // Prepare an sql statement
// var stmt = db.prepare("SELECT * FROM hello WHERE a=:aval")

// // Bind values to the parameters and fetch the results of the query
// var result = stmt.getAsObject({':aval' : 1})
// console.log(result) // Will print {a:1, b:'world'}
// var data = db.export()
// var buffer = new Buffer(data)
// fs.writeFileSync("./files/filename.sqlite", buffer)


sql_query()
sql_inserts_gen()