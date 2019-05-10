const request = require('request')



const forecast = (latitude, longitude, callback) => {
    const urlDarkSky = 'https://api.darksky.net/forecast/29cc9f568e73bee9d808b44a8baa235c/' + latitude + ',' + longitude + '?units=si'

    request({ url: urlDarkSky, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const currently = response.body.currently
            const daily = response.body.daily

            callback(undefined, daily.data[0].summary + ' It is currently ' + currently.temperature + ' degrees out. There is ' + currently.precipProbability + '% chance of rain. Today has a high temperature of ' + daily.data[0].temperatureHigh + ' degrees and a low temperature of ' + daily.data[0].temperatureLow + ' degrees.')
        }
    })
}

module.exports = forecast