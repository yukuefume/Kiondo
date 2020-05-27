var bom = require('./services/bom.js')

var url = require('url')
var express = require('express');
app = express()


app.get('/', (req, res) => {
    res.send('rpitemp-api is running!');
}) 

app.get('/temperature', (req, res) => {
    var q = url.parse(req.url, true).query;
    var temp = undefined

    if (q.outside == 'yes') {    
        bom.currentTemperature((data) => {

            var data = { 
              'temperature': data.air_temp,
              'probe': 'web',
              'location': data.name,
              'time': data.local_date_time_full
            }
    
            res.send(data)
        });
    } else {
        var probe = 'thermometer'

        var data = { 
          'temperature': temp,
          'probe': probe,
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