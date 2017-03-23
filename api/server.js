const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'
app.locals.foods = {}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/', (req, res) => {
  res.send(app.locals.title)
});

app.get('/api/foods', (req, res) => {
  database.raw('SELECT * FROM foods').then(data => res.json(data.rows))
})

app.get('/api/foods/:id', (req, res) => {
  const id = req.params.id
  showFood(id, res)
})

app.post('/api/foods', (req, res) => {
  const calories = req.body.calories
  const name = req.body.name
  if (name && calories) { return createFood(name, calories, res) }
  res.status(422).send({ error: 'Needs name and calories' })
})

app.put('/api/foods/:id', (req, res) => {
  const id = req.params.id
  const calories = req.body.calories 
  const name = req.body.name
  updateFood(id, name, calories, res)
})

app.delete('/api/foods/:id', (req, res) => {
  const id = req.params.id
  deleteFood(id, res)
})

function respondWith404(res, id) {
  res.status(404).send({ error: `Could not find food with id ${id}` })
}

function respond(data, id, res) {
  if (!data.rowCount) { return res.sendStatus(404) }
  res.json(data.rows[0])
}

function showFood(id, res) {
  database.raw('SELECT * FROM foods WHERE id = ?', id)
  .then(data => respond(data, id, res))
}

function createFood(name, calories, res) {
  database.raw(`INSERT INTO foods
    (name, calories, created_at)
    VALUES (?, ?, ?)
    RETURNING *`,
    [name, calories, new Date])
  .then(data => res.status(201).json(data))
}

function updateFood(id, name, calories, res) {
  if (name && calories) { return updateNameCalories(id, name, calories, res) }
  if (calories) { return updateCalories(id, calories, res) }
  if (name) { return updateName(id, name, res) }
}

function updateNameCalories(id, name, calories, res) {
  database.raw(`UPDATE foods
    SET calories = ?,
    name = ?
    WHERE id = ?
    RETURNING * `,
    [calories, name, id])
  .then(data => respond(data, id, res))
}

function updateName(id, name, res) {
  database.raw(`UPDATE foods
    SET name = ?
    WHERE id = ?
    RETURNING * `,
    [name, id])
  .then(data => respond(data, id, res))
}

function updateCalories(id, calories, res) {
  database.raw(`UPDATE foods
    SET calories = ?
    WHERE id = ?
    RETURNING * `,
    [calories, id])
  .then(data => respond(data, id, res))
}

function deleteFood(id, res) {
  database.raw('DELETE FROM foods WHERE id = ?', id)
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
