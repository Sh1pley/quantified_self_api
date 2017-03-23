const Food = require('../models/food')

function respondWith404(res, id) {
  return res.status(404).send({ error: `Could not find food with id ${id}` })
}

function respond(data, id, res) {
  if (!data.rowCount) { return res.sendStatus(404) }
  return res.json(data.rows[0])
}

function show(req, res) {
  const id = req.params.id
  return Food.find(id)
  .then(data => respond(data, id, res))
}

function create(req, res) {
  const calories = req.body.calories
  const name = req.body.name
  if (name && calories) {
    return Food.create(name, calories)
    .then(data => res.status(201).json(data))
  }
  return res.status(422).send({ error: 'Needs name and calories' })
}

function remove(req, res) {
  const id = req.params.id
  return Food.remove(id)
  .then(data => {
    if (data.rowCount) { return res.status(200).send('Food deleted.') }
    respondWith404(res, id)
  })
}

function update(req, res) {
  const id = req.params.id
  const calories = req.body.calories 
  const name = req.body.name
  return Food.update(id, name, calories)
  .then(data => respond(data, id, res))
}

function home(req, res) {
  return res.send(app.locals.title)
}

function all(req, res) {
  return Food.all().then(data => res.json(data.rows))
}

module.exports = {
  remove: remove,
  update: update,
  show: show,
  respond: respond,
  respondWith404: respondWith404,
  update: update,
  create: create,
  home: home,
  all: all
}
