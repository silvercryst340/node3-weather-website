const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2lsdmVyY3J5c3QzNDAiLCJhIjoiY2p2YzNuanJiMXRybTRlcXB2bGprY3N2dCJ9.aHWt7poP3iV_2rAlb8DQzw&limit=1'

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const { center, place_name } = response.body.features[0]
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name
            })
        }
    })
}

module.exports = geocode