const http = require('http')


module.exports.getTemperature = function getTemperature(callback) {
    /* Weather data for Parafield, South Australia */
    let options = {
        host: 'reg.bom.gov.au',
        path: '/fwo/IDS60901/IDS60901.95677.json'
    }

    onResponseCallback = (response) => {
        let str = ''

        response.on('data', (chunk) => {
            str += chunk
        })

        response.on('end', () => {
            let latest_data = JSON.parse(str).observations.data[0]
            let data = { 
                'temperature': latest_data.air_temp,
                'probe': 'web',
                'location': latest_data.name,
                'time': latest_data.local_date_time_full
              }
            callback(data)
        });
    }

    http.request(options, onResponseCallback).end();
}
