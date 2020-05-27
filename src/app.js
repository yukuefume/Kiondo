var url = require('url')
var express = require('express');
app = express()


app.get('/', function (req, res) {
    res.send('rpitemp-api is running!');
}) 

/* Return temperature from thermometer */
app.get('/temperature', function (req, res) {
    var q = url.parse(req.url, true).query
    var temp = 20

    if (q.outside == 'yes') {
        var probe = 'web'
    } else {
        var probe = 'thermometer'
    }

    var data = { 
        'temperature': temp,
        'probe': probe,
        'time': Date()
    }

    res.send(data)
})

var server = app.listen(8081, function () {
var host = server.address().address
var port = server.address().port

console.log("Listening at http://%s:%s", host, port)
})