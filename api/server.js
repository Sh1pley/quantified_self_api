const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Food = require('./lib/models/food')

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'
app.locals.foods = {}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/', (req, res) => {
  res.send(app.locals.title)
});

app.get('/api/foods', (req, res) => {
  Food.getAllFoods().then(data => res.json(data.rows))
})

app.get('/api/foods/:id', (req, res) => {
  const id = req.params.id
  showFoodAndRespond(id, res)
})

app.post('/api/foods', (req, res) => {
  const calories = req.body.calories
  const name = req.body.name
  if (name && calories) { return createFoodAndRespond(name, calories, res) }
  res.status(422).send({ error: 'Needs name and calories' })
})

app.put('/api/foods/:id', (req, res) => {
  const id = req.params.id
  const calories = req.body.calories 
  const name = req.body.name
  updateFoodAndRespond(id, name, calories, res)
})

app.delete('/api/foods/:id', (req, res) => {
  const id = req.params.id
  deleteFoodAndRespond(id, res)
})

function respondWith404(res, id) {
  res.status(404).send({ error: `Could not find food with id ${id}` })
}

function respond(data, id, res) {
  if (!data.rowCount) { return res.sendStatus(404) }
  res.json(data.rows[0])
}

function showFoodAndRespond(id, res) {
  Food.getFood(id)
  .then(data => respond(data, id, res))
}

function createFoodAndRespond(name, calories, res) {
  Food.createFood(name, calories)
  .then(data => res.status(201).json(data))
}

function updateFoodAndRespond(id, name, calories, res) {
  if (name && calories) { return updateNameCaloriesAndRespond(id, name, calories, res) }
  if (calories) { return updateCaloriesAndRespond(id, calories, res) }
  if (name) { return updateNameAndRespond(id, name, res) }
}

function updateNameCaloriesAndRespond(id, name, calories, res) {
  Food.updateNameAndCalories(id, name, calories)
  .then(data => respond(data, id, res))
}

function updateNameAndRespond(id, name, res) {
  Food.updateName(id, name)
  .then(data => respond(data, id, res))
}

function updateCaloriesAndRespond(id, calories, res) {
  Food.updateCalories(id, calories)
  .then(data => respond(data, id, res))
}

function deleteFoodAndRespond(id, res) {
  Food.deleteFood(id)
  .then(data => {
    if (data.rowCount) { return res.status(200).send('Food deleted.') }
    respondWith404(res, id)
  })
}

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}`)
  })
}

module.exports = app;
