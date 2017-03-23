const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

function find(id) {
  return database.raw('SELECT * FROM foods WHERE id = ?', id)
}

function create(name, calories) {
  return database.raw(`INSERT INTO foods
    (name, calories, created_at)
    VALUES (?, ?, ?)
    RETURNING *`,
    [name, calories, new Date])
}

function remove(id) {
  return database.raw('DELETE FROM foods WHERE id = ?', id)
}

function all() {
  return database.raw('SELECT * FROM foods')
}

function clear() {
  return database.raw('TRUNCATE foods RESTART IDENTITY')
}

function update(id, name, calories) {
  if (name && calories) { return updateNameAndCalories(id, name, calories) }
  if (calories) { return updateCalories(id, calories) }
  if (name) { return updateName(id, name) }
}

function updateNameAndCalories(id, name, calories) {
  return database.raw(`UPDATE foods
    SET calories = ?,
    name = ?
    WHERE id = ?
    RETURNING * `,
    [calories, name, id])
}

function updateName(id, name) {
  return  database.raw(`UPDATE foods
    SET name = ?
    WHERE id = ?
    RETURNING * `,
    [name, id])
}

function updateCalories(id, calories) {
  return database.raw(`UPDATE foods
    SET calories = ?
    WHERE id = ?
    RETURNING * `,
    [calories, id])
}

module.exports = {
  find: find,
  remove: remove,
  all: all,
  update: update,
  updateNameAndCalories: updateNameAndCalories,
  updateCalories: updateCalories,
  updateName: updateName,
  create: create,
  clear: clear
}