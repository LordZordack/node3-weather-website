const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templets/views')
const partialsPath = path.join(__dirname, '../templets/partials')


// Setupt handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//home page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app.',
        name: 'Mapley'
    })

})

//about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather.',
        name: 'Drewbie'
    })

})

//help page
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'The weather is so sad. You are a complete meanie.',
        title: 'Help Weather.',
        name: 'Mapley'
    })
})


//weather page
app.get('/weather', (req, res) => {
    //get address from query
    const address = req.query.address
    if (!req.query.address) {
        return res.send({
            error: "please provide an address... the weather isn't happy"
        })
    }
    geocode(address, (error, {latitude, longitude, location} = {} = {}) => {
        if (error) {
            return res.send({error})
        } 

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location, 
                latitude,
                longitude,
                address: req.query.address
            })
        })
        
    })
   
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'provide a search term.... broseph.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

// help 404
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'mapley',
        message: 'help article not found'
    })
})

//404 page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'mapley',
        message: 'page not found'

    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

