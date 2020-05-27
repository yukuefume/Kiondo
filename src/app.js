var bom = require('./services/bom.js')

var url = require('url')
var express = require('express');

app = express()

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

var server = app.listen(8081, () => {
var host = server.address().address
var port = server.address().port

console.log("Listening at http://%s:%s", host, port)
})