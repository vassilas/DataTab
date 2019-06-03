
// INCLUDES - LIBRARIES
let $ = require('jquery')
let fs = require('fs')
var sql = require('sql.js')
var csv2sql = require('csv2sql-stream')
var sql = require('sql.js')
var mysql = require('mysql')
// let Tabulator = require('tabulator-tables')



// GLOBAL VARIABLES
let filename = './files/test_contacts.csv'
var db = new sql.Database()
let sno = 0
const DEBUG = true