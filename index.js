var express = require('remote')
var port = 3000
var app = express()

const used = process.memoryUsage().heapUsed / 1024 / 1024;

app.get('/', function(req, res){
  res.send(`
  <html>
      <head>
          <meta charset="utf-8">
      </head>
      <body>
          <h3>Página inicial</h3>
      </body>
  </html>
`)
})

app.get('/redirect', function(req, res){
  res.redirect('https://expressjs.com/pt-br/guide/routing.html')
  console.log('/redirect ok')
})

app.get('/download', function(req, res){
  console.log('/mensage/* ok0')
  res.redirect('https://expressjs.com/pt-br/guide/routing.html')
})

app.get('/mensage/*', function(req, res){
  console.log('/mensage/* ok0')
  res.sendStatus('204')
})

app.post('/mensage/*', function (req,res){
  res.json('random.text');
  console.log('randomtext feito');
  return app.get('/mensage')  
})

app.get('/memory_usage', function(req, res){
  res.json({status: `A quantidade de mémoria RAM utilizada é de ${Math.round(used * 100) / 100} MB`})
})

app.listen(port, function(){
  console.log(`server is running at localhost:${port}`);
});

