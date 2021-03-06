const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Philip'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Philip'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Philip',
    message: 'Hello this is the help page.'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
    if(error){
      return res.send({
        error
      })
    }
  
    forecast(latitude, longitude, (error, forecastData) => {
      if(error){
        return res.send({
          error
        })
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
      error: 'You must provide a search term'
    })
  }

  console.log(req.query.search)
    res.send({
      products: []
    })
})

app.get('/help/*', (req, res) => {
  res.render('error', {
    message: 'Help page not found',
    title: '404',
    name: 'Philip'
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    message: 'Page not found',
    title: '404',
    name: 'Philip'
  })
})

app.listen(port, () => {
  console.log('Server is up on port' + port)
})
