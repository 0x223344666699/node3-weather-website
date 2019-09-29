const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoianVhbm1udCIsImEiOiJjazE0cXMwMngwbDNlM2l0Z2kwN3RjcnRlIn0.KIYtxDkMgpBHNsStULsRfA&limit=1'

    request({url, json: true}, (error, {body: {features}})=>{
        if(error) {
            callback('Unable to connnect to location services',undefined)
        } else if(features.length === 0) {
            callback('No results matching query. Try another search', undefined)
        } else {
            data = {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            }
            callback(undefined,data)
        }
    })
}

module.exports = geocode