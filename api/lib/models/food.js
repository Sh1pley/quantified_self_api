const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

function getFood(id) {
  return database.raw('SELECT * FROM foods WHERE id = ?', id)
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

function createFood(name, calories) {
  return database.raw(`INSERT INTO foods
    (name, calories, created_at)
    VALUES (?, ?, ?)
    RETURNING *`,
    [name, calories, new Date])
}

function deleteFood(id) {
  return database.raw('DELETE FROM foods WHERE id = ?', id)
}

function updateNameAndCalories(id, name, calories) {
  return database.raw(`UPDATE foods
    SET calories = ?,
    name = ?
    WHERE id = ?
    RETURNING * `,
    [calories, name, id])
}

function getAllFoods() {
  return database.raw('SELECT * FROM foods')
}

module.exports = {
  getFood: getFood,
  deleteFood: deleteFood,
  getAllFoods: getAllFoods,
  updateNameAndCalories: updateNameAndCalories,
  updateCalories: updateCalories,
  updateName: updateName,
  createFood: createFood
}