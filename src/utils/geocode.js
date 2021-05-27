const request = require('request')

//challenge with callback

const geocode = (searchAddress, callback)=> {    
    console.log('Requesting.. to api.mapbox.com')
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(searchAddress) +".json?access_token=pk.eyJ1IjoiYmF0YW5nYXNkZWFsIiwiYSI6ImNrb3I2aGFyNzByNzkydmtoYTY0eXYxMjEifQ.P-A_5GZBABvx9HMhTF1iQw"    

    request( { url: url, json: true}, (error, response)=>{

        
        if (error) {            
            callback('Unable to location services.',undefined)
        } else if ((!response.body.features) || (response.body.features.length===0)){ 
            callback('Unable to find location. Try another search.',undefined)
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],   
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode