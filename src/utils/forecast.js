const request = require('request')

//https://home.openweathermap.org/
//API
//61bd51fde91a39c169c5cde1ff268802
//http://api.weatherstack.com/current?access_key=61bd51fde91a39c169c5cde1ff268802&query=13.76,121.06
//
//https://app.tomorrow.io/home
//batangasdeal, _incredJ8_



const forecast = (latitude, longitude, callback) => {    
    const URL="http://api.weatherstack.com/current?access_key=61bd51fde91a39c169c5cde1ff268802&query=" + latitude +"," + longitude
    
    console.log(URL)
    
    request( {url: URL, json: true}, (error, response) => {
        
        //low level error
        if (error) {
            callback('Unable to connect to weatherstack.com.', undefined)
        }
        else if (response.body.error) {
            //coordinate error
            callback("Forecast: Location not found.", undefined)            
        } else {

            
            callback(undefined, response.body.current.weather_descriptions[0] + ', temperature=' + response.body.current.temperature   + '°, ' + response.body.current.observation_time)
        }
        
        // console.log("data: ", response)
    })
}


module.exports = forecast