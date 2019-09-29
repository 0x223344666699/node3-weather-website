const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
 
// Setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirectoryPath)) 

// Routing
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App', 
        name: 'Juan Montero'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me', 
        name: 'Juan Montero'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help', 
        name: 'Juan Montero',
        helpText: 'This is the help section. Not very useful yet.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must introduce an address'
        })
    }
    const address = req.query.address
    geocode(address, (error, {location, latitude, longitude} = {}) => {
        // console.log(location + ' ('+latitude+', '+longitude+')')
        if (error) {
            return res.send({ error })            
        }
        forecast(latitude, longitude, (error,forecastData) => {
            if (error) {
                return res.send({ error })            
            }
            res.send({
                forecast: forecastData, 
                location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    } 
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 'Help: Error 404', 
        errorMsg: 'Oops. Help article not found.'
    })})

app.get('*', (req, res) => {
    res.render('404',{
        title: 'Error 404', 
        errorMsg: 'Oops. Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port+'.')
})