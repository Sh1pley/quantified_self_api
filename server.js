const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const FoodsController = require('./lib/controllers/foods-controller')
const cors = require('cors')

app.use(cors(corsOptions))

app.options('*', cors(corsOptions))

app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/api/foods', (req, res) => FoodsController.all(req, res))

app.get('/api/foods/:id', (req, res) => FoodsController.show(req, res))

app.post('/api/foods', (req, res) => FoodsController.create(req, res))

app.put('/api/foods/:id', (req, res) => FoodsController.update(req, res))

app.delete('/api/foods/:id', (req, res) => FoodsController.remove(req, res))

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}`)
  })
}

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

app.options('*', cors(corsOptions))

module.exports = app;