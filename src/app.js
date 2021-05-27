const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

//define path for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory))



app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Joseph Castillo'
    })
})


app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Page',
        name: 'Joseph Castillo'
    })
})

//app.com,
//app.com/help
//app.com/about


app.get('/help', (req, res)=> {    
    res.render('help', {
        title: 'Help Page',
        name: 'Joseph Castillo',
        address : 'Address'
    })    
})


app.get('/route', (req, res)=> {
    res.render('route', {
        title: 'Route Page',
        name: 'Joseph P Castillo',
        address: 'Batangas'
    })
})

app.get('/weather', (req, res)=> {
    if (!req.query.address){
        return res.send({error: 'You must provide an address.'})
    }
         

    // //console.log('fetching record for ' + address)
    const address = req.query.address

    geocode(address, (error, {latitude, longitude, location}={}) => {
        if (error) {
            return res.send({ error })
        }
        console.log('fetching forecast...')
        forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({ error })
        }   
        console.log('sending forecast...')
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
            
        })
            
        // res.send({
        //     latitude: data.latitude,
        //     longitude: data.longitude,
        //     location: "Batangas",
        //     address: req.query.address
        // })
    
        
    })

   
})

app.get('/products', (req, res)=> {
    
    if (!req.query.search) {
        return res.send('You must provide a search term.')
    }
    else {
        console.log(res.require.search.value)

    }

    console.log('Search: ',req.query.search)
    res.send( {
        products: []
    })
    
})





app.get('*', (req, res)=> {
    res.send('404 Page not found.')
})

app.listen(3000, ()=> {
    console.log('Server is up on port 3000.')
})