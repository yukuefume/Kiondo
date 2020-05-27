exports.currentTemperature = (callback) => {
    var http = require('http')

    var options = {
        host: 'reg.bom.gov.au',
        path: '/fwo/IDS60901/IDS60901.95677.json'
    }

    http_callback = (response) => {
        var str = ''
        var recent_data = ''

        response.on('data', (chunk) => {
            str += chunk
        })

        response.on('end', () => {
            var recent_data = JSON.parse(str).observations.data[0]
            callback(recent_data)
        });
    }

    http.request(options, http_callback).end();
  }; 
