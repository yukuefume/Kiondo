const bom = require('./services/bom.js')

const cron = require('node-cron')
const url = require('url')
const express = require('express');


let app = express()


/**
 * Initialise sqlite3 database for temperature logging.
 */
const db = require('./services/db.js')


/**
 *  CRON job for logging temperature values every 30 minutes.
 */
cron.schedule("30 * * * *", function() {
  bom.getTemperature(function(data) {
    let timestamp = new Date().toLocaleString()
    db.logTemperature(0, data.temperature, data.location, data.time, timestamp)
  });
});


/* API Routes */
app.get('/', (req, res) => {
  res.send('Kiondo is running!');
}) 

app.get('/temperature', (req, res) => {
  var q = url.parse(req.url, true).query;
  
  if (q.outside == 'yes') {    
      console.log('outside!')
      console.log(bom)
      bom.getTemperature(function(data) {
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