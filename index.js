var express = require('express')
var port = 3000
var app = express()
var string = "não feito feito /post"
var fs = require('fs');

const used = process.memoryUsage().heapUsed / 1024 / 1024;


app.get('/', function(req, res){
  res.send(`
  <html>
      <head>
          <meta charset="utf-8">
      </head>
      <body>
          <h1>Página inicial </h1>
      </body>
  </html>
`)
})

app.post('/message/:string?', function(req,res){
  this.string = req.params.string
  res.send("Status 204")
  console.log('post ok, redirecinado >')
})

app.get('/message', function(req,res){
  console.log(string)
  if(string === undefined){
    res.send('status = 419')
    console.log('status = 419')
  }
  else if(!isNaN(string)){
    let n = +string
    setTimeout(() => {
      res.send('delay de ' + string +' milisegundos');
    }, n)}
  else{res.send(string)}
  console.log('get/message ok')
  fs.writeFile("stringsalva.txt", `${string}`, function(err) {
  if(err) {
      throw err;
  }

  console.log("Arquivo salvo");}) 
})

app.get('/memory_usage', function(req, res){
  res.json({status: `A quantidade de mémoria RAM utilizada é de ${Math.round(used * 100) / 100} MB`})
})

app.listen(port, function(){
  console.log(`server is running at localhost:${port}`);
});

