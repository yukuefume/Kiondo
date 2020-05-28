const bom = require('./services/bom.js')

const cron = require('node-cron')
const url = require('url')
const express = require('express');


let app = express()


/* Check if existing database exist, if not create one */
const db = require('./services/db.js')
db.connection.create()

/* CRON job for logging values */
cron.schedule("* * * * *", function() {
  console.log("running a task every minute");
});


/* API Routes */
app.get('/', (req, res) => {
  res.send('Kiondo is running!');
}) 

app.get('/temperature', (req, res) => {
  var q = url.parse(req.url, true).query;

if (q.outside == 'yes') {    
    bom.currentTemperature((data) => {
      res.send(data)
    });
  } else {
    /* Stub code */
    var data = { 
      'temperature': '20',
      'probe': 'thermometer',
      'time': Date()
    }
    res.send(data)
  }
})

let server = app.listen(8081, () => {
  let host = server.address().address
  let port = server.address().port

  console.log("Listening at http://%s:%s", host, port)
})