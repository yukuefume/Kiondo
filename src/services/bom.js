exports.currentTemperature = (callback) => {
    var http = require('http')

    var options = {
        host: 'reg.bom.gov.au',
        path: '/fwo/IDS60901/IDS60901.95677.json'
    }

    http_callback = (response) => {
        var str = ''

        response.on('data', (chunk) => {
            str += chunk
        })

        response.on('end', () => {
            var latest_data = JSON.parse(str).observations.data[0]
            var data = { 
                'temperature': latest_data.air_temp,
                'probe': 'web',
                'location': latest_data.name,
                'time': latest_data.local_date_time_full
              }
            callback(data)
        });
    }

    http.request(options, http_callback).end();
  }; 
