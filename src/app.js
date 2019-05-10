const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath =  path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Andrew mead'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        errorMsg: 'Help article not found',
        name: 'Andrew Mead'
    })
})

// app.get('', (req, res) => {
//     res.send('<h1>Hello express!</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Andrew',
//         age: 27
//     }, {
//         name: 'Sarah',
//         age: 26
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
    const { address } = req.query

    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(address, (error, data) => {
        if (error) {
            return res.send({ error })
        }

        const { latitude, longitude, location } = data
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({ error })
            }

            res.send({ forecast, location, address })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        errorMsg: 'Page not found',
        name: 'Andrew Mead'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})