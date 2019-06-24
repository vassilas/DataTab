
// INCLUDES - LIBRARIES
let $ = require('jquery')
let fs = require('fs')
let sql = require('sql.js')
let csv2sql = require('csv2sql-stream')
let mysql = require('mysql')
// const sqlite3 = require('sqlite3').verbose();
// let Tabulator = require('tabulator-tables')



// GLOBAL VARIABLES
// let db_sqlite3 = new sqlite3.Database(':memory:');
let filename = './files/test_contacts.csv'
let db = new sql.Database()
let sno = 0
const DEBUG = true


