const request = require('request')

forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=cd9181eaaebf8b062b96f625ba018f0b&query=' + latitude + ',' + longitude + '&units=f'
  
  request({url, json: true}, (error, {body}) =>{
    if(error){
      callback('Unable to connect to weather services.', undefined)
    }else if(body.error){
      callback('Unable to find location. Please try again.', undefined)
    }else{
      callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. There is currently ${body.current.precip}% chance of rain.`)
    }
  })
}

module.exports = forecast