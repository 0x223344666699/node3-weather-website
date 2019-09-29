const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/bdd08f2e13491ce74aee09ded9e75350/'+lat+','+lon+'?units=si'
    const data = request({url, json:true}, (error, {body: {daily, bodyError, currently: {temperature, precipProbability}}}) => {
        if(error){
            callback('Unable to connect to forecast services.', undefined)
        } else if(bodyError) {
            callback('Location not found. Try another search.', undefined)
        } else {
            temp = temperature
            chance = precipProbability
            callback(undefined, daily.data[0].summary + ' It is currently '+temp+' degrees out. There is a '+chance+'% chance of rain.')
        }
    })
}

module.exports = forecast