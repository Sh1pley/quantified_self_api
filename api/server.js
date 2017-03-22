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

app.post('/api/foods', (req, res) => {
  const calories = req.body.calories
  const name = req.body.name
  if (app.locals.foods[name]) { return res.status(422).send(`${name} already exists!`)}
  if (name && calories) {
    app.locals.foods[name] = calories
    return  res.status(201).json({name, calories})
  }
  return res.status(422).send({ error: 'Needs name and calories' })
})

app.get('/api/foods/:id', (req, res) => {
  const id = req.params.id
  database.raw('SELECT * FROM foods WHERE id = ?', [id])
  .then(data => {
    if (!data.rowCount) { return res.sendStatus(404) }
    res.json(data.rows[0])
  })
})

app.put('/api/foods/:id', (req, res) => {
  const id = req.params.id
  console.log(getFood(id))
  const calories = req.body.calories 
  const name = req.body.name
  // name = 'hi'
  // calories = 10
  if (calories) {
    database.raw(
      `UPDATE foods
      SET calories = ?, name = ?
      WHERE id = ?`,
      [calories, name, id]
    )
    .then( () => {
      database.raw(`SELECT * FROM foods WHERE id = ?`, [id])
      .then(data => res.json(data.rows[0]))
    })
  }
})
    
  
function getFood(id) {
  database.raw(`SELECT * FROM foods WHERE id = ?`, [id])
}

//   if (calories && app.locals.foods[oldName]) {
//     if (oldName != newName) { delete app.locals.foods[oldName] }
//     return  res.json({newName, calories})
//   }
//   return res.status(404).send({ error: `Could not find food ${oldName}` })
// })

app.delete('/api/foods/:name', (req, res) => {
  const name = req.params.name
  if (app.locals.foods[name]) { 
    delete app.locals.foods[name] 
    return res.status(200).send(`${name} deleted.`)
  }
  return res.status(404).send({ error: `Could not find food ${name}` })
})

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}`)
  })
}

module.exports = app;