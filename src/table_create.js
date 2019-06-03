


$('#add-to-list').on('click', () => {
   let name = $('#Name').val()
   let email = $('#Email').val()

   fs.appendFile(filename, name + ',' + email + '\n')

   addEntry(name, email)
})

function addEntry(name, email) {
   if(name && email) {
      sno++
      let updateString = '<tr><td>'+ sno + '</td><td>'+ name +'</td><td>' 
         + email +'</td></tr>'
      $('#contact-table').append(updateString)
   }
}

function loadAndDisplayContacts() {  
    displayTable(["No." , "Name" , "E-mail" ] ," ")


   //Check if file exists
   if(fs.existsSync(filename)) {
      let data = fs.readFileSync(filename, 'utf8').split('\n')
      
      data.forEach((contact, index) => {
         let [ name, email ] = contact.split(',')
        addEntry(name, email)
      })
   
   } else {
      console.log("File Doesn\'t Exist. Creating new file.")
      fs.writeFile(filename, '', (err) => {
         if(err)
            console.log(err)
      })
   }
   
}


function displayTable(fields,data){
    let htmlField = ""
    
    fields.forEach(col => {
        htmlField = htmlField + '<th>'+ col +'</th>'
    })
    htmlField = '<tr>'+ htmlField + '</tr>'


    $('#contact-table').html(htmlField)
}




loadAndDisplayContacts()