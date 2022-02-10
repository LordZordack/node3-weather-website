const request = require('request')

const forecast = (latitude, longitude, callback) => {
    //const url = 'http://api.weatherstack.com/current?access_key=821ac75c4b036069c90c991875b1dada&query=' + longitude + ',' + latitude + '&units=f'
    const url = 'http://api.weatherstack.com/current?access_key=cf215db342b99ce6b3f1b56c2d1a4baa&query='+ latitude + ',' + longitude + '&units=f'
    request({ url, json: true},  (error, {body}) => {
        
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
            console.log(url)
        } else {
            callback(undefined, 'It looks '+ body.current.weather_descriptions[0]+ '. It is ' + body.current.temperature + ' degrees ouside, but it feels like ' + body.current.feelslike + ' degrees.')
        }
    })
}
// {
//     temp: response.body.current.temperature,
//     feelsLike: response.body.current.feelsLike,
//     weatherDescription: response.body.current.weather_descriptions[0]
// }
module.exports = forecast