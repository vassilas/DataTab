// MYSQL CONFIGURATION
// ------------------------------------------------------------------
var host_conf = ""
var user_conf = ""
var password_conf = ""
var database_conf = ""
var mysql_connnection

// 1) Read the configuration file APP-CONFIG.json
var json_conf = $.getJSON( "../APP-CONFIG.json", {
        format:"json"
    }).done(function() {
        //console.log(json_conf.responseJSON.mysql_configuration.host) 
        host_conf = json_conf.responseJSON.mysql_configuration.host
        user_conf = json_conf.responseJSON.mysql_configuration.user
        password_conf = json_conf.responseJSON.mysql_configuration.password
        database_conf = json_conf.responseJSON.mysql_configuration.database

// 2) Set the connection Variable
        mysql_connnection = mysql.createConnection({
            host: host_conf,
            user: user_conf,
            password: password_conf,
            database: database_conf
        });
    })



// MYSQL CONNECT
// ------------------------------------------------------------------
function mysql_connect(){
    mysql_connnection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
}

// MYSQL SELECT
// ------------------------------------------------------------------
function mysql_select(query)
{
    return new Promise(function(resolve, reject) {
        mysql_connnection.query(query, function (err, result) 
        {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.stringify(result));
        })
    })
}


function mysql_query(query)
{
        return new Promise(function(resolve, reject) {
        mysql_connnection.query(query, function (err, result) 
        {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    })
}

// MYSQL DISCONNECT
// ------------------------------------------------------------------
function mysql_disconnect(){
    mysql_connnection.end(function(err){
        if (err) throw err;
        console.log("Disconnected!");
    });
}



// MYSQL GET PRIMARY KEY OF TABLE
// ------------------------------------------------------------------
function mysql_get_pri_key(TABLE_NAME,TABLE_SCHEMA){
    var query = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '"+TABLE_SCHEMA+"' AND TABLE_NAME = '"+TABLE_NAME+"' AND COLUMN_KEY = 'PRI';"
    
    return new Promise(function(resolve, reject) {
        mysql_connnection.query(query, function (err, result) 
        {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    })
    
    
    
    
    // var res = mysql_query(query);
    // res.then((successMessage) => {
    //     console.log(successMessage[0].COLUMN_NAME)       
    //     return successMessage[0].COLUMN_NAME
    // });
}




// SYNC REQUESTS
// ------------------------------------------------------------------
async function sync_Select(query) {
    let promise = new Promise(function(resolve, reject) {
        mysql_connnection.query(query, function (err, result) 
        {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.stringify(result));
        })
    })

    let ans = await promise
    console.log("TEST 1 : "+ans)
    return ans
}
  

