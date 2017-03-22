const app = require('../server')
const assert = require('chai').assert
const request = require('request')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const expectedFood = {
  "calories": 10,
  "id": 1,
  "name": "Banana"
}


describe('Foods API', () => {
  before((done) => {
    this.port = 9999;
    this.request = request.defaults({ baseUrl: 'http://localhost:9999'})
    this.server = app.listen(this.port, (err, res) => {
      if (err) { done(err) }
      done()
    })
  })

  after(() => {
    this.server.close()
  })

  it('exists', () => {
    assert(app)
  })

  afterEach((done) => {
    database.raw('TRUNCATE foods RESTART IDENTITY')
    .then(() => done());
  })

  beforeEach((done) => {
    database.raw(
      'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
      ['Banana', 10, new Date]
    ).then(() => done())
    .catch(done);
  })

  describe('GET to /api/foods', () => {
  
    it('returns list of all foods', (done) => {
      this.request.get('/api/foods', (err, res) => {
        if (err) { done(err) }
        const parsedFoods = JSON.parse(res.body)
        const parsedFood = parsedFoods[0]

        assert.equal(res.statusCode, 200)
        assert.typeOf(parsedFoods, 'array')
        assert.equal(parsedFood.name, expectedFood.name)
        assert.equal(parsedFood.calories, expectedFood.calories)
        assert.equal(parsedFood.id, expectedFood.id)
        done()
      })
    })
  })

  describe('GET to /api/foods/:id', () => {

    it('return 404 if resource not found', (done) => {
      this.request.get('/api/foods/1000', (err, res) => {
        if (err) { done(err) }
        assert.equal(res.statusCode, 404)
        done()
      })
    })

    it('returns name and calories if food is found', (done) => {
      this.request.get('/api/foods/1', (err, res) => {
        if (err) { done(err) }
        const parsedFood = JSON.parse(res.body)

        assert.equal(res.statusCode, 200)
        assert.typeOf(parsedFood, 'object')
        assert.equal(parsedFood.name, expectedFood.name)
        assert.equal(parsedFood.calories, expectedFood.calories)
        assert.equal(parsedFood.id, expectedFood.id)
        done()
      })
    })
  })

  describe('PUT to /api/foods/:id', () => {

    // it('return 404 if resource not found', (done) => {
    //   this.request.put('/api/foods/1000', (err, res) => {
    //     if (err) { done(err) }
    //     assert.equal(res.statusCode, 404)
    //     done()
    //   })
    // })

    it('it receives calories and updates data', (done) => {
      const food = {calories: 100}
      this.request.put('/api/foods/1', {form: food}, (err, res) => {
        if (err) { done(err) }
        database.raw('SELECT * FROM foods WHERE id = 1').then(data => {
          const savedFood = data.rows[0]
          // assert.equal(res.statusCode, 200)
          assert.equal(savedFood.name, expectedFood.name)
          assert.equal(savedFood.calories, 100)
          assert.equal(savedFood.id, expectedFood.id)
          assert.include(res.body, food.calories)
          assert.include(res.body, expectedFood.name)
          done()
        })
      })
    })

    it('it receives name and updates data', (done) => {
      const food = {name: 'Grape'}
      this.request.put('/api/foods/1', {form: food}, (err, res) => {
        if (err) { done(err) }
        database.raw('SELECT * FROM foods WHERE id = 1').then(data => {
          const savedFood = data.rows[0]
          // assert.equal(res.statusCode, 200)
          assert.equal(savedFood.name, food.name)
          assert.equal(savedFood.calories, 100)
          assert.equal(savedFood.id, expectedFood.id)
          assert.include(res.body, expectedFood.calories)
          assert.include(res.body, food.name)
          done()
        })
      })
    })
  })

  describe('DELETE to /api/foods', () => {
    beforeEach(() => { app.locals.foods = { grape: 5} })

    it('return 404 if resource not found', (done) => {
      this.request.delete('/api/foods/invalidfood', (err, res) => {
        if (err) { done(err) }
        assert.equal(res.statusCode, 404)
        done()
      })
    })

    it('deletes food if food is present', (done) => {
      this.request.delete('/api/foods/grape', (err, res) => {
        if (err) { done(err) }
        const foodCount = Object.keys(app.locals.foods).length
        assert.equal(foodCount, 0)
        done()
      })
    })
  })


  describe('POST to /api/foods', () => {
    beforeEach(() => {
      app.locals.foods = {}
    })

    it('does not return 404', (done) => {
      this.request.post('/api/foods', (err, res) => {
        if (err) { done(err) }
        assert.notEqual(res.statusCode, 404)
        done()
      })
    })

    it('it receives and stores data', (done) => {
      const food = {calories: 10, name: "banana"}

      this.request.post('/api/foods', {form: food}, (err, res) => {
        if (err) { done(err) }
        const foodCount = Object.keys(app.locals.foods).length
        assert.equal(foodCount, 1)
        assert.include(res.body, food.calories)
        assert.include(res.body, food.name)
        done()
      })
    })

    it('returns 422 if it does not include a name', (done) => {
      const invalidFood = {calories: 10}

      this.request.post('/api/foods', {form: invalidFood}, (err, res) => {
        if (err) { done(err) }
        const foodCount = Object.keys(app.locals.foods).length
        assert.equal(foodCount, 0)
        assert.equal(res.statusCode, 422)
        done()
      })
    })

    it('returns 422 if it does not include a calories', (done) => {
      const invalidFood = {name: "food"}

      this.request.post('/api/foods', {form: invalidFood}, (err, res) => {
        if (err) { done(err) }
        const foodCount = Object.keys(app.locals.foods).length
        assert.equal(foodCount, 0)
        assert.equal(res.statusCode, 422)
        done()
      })
    })

    it('returns 422 if name is not unique', (done) => {
      app.locals.foods["banana"] = 10
      const food = {name: 'banana', calories: 100}
      this.request.post('/api/foods', {form: food}, (err, res) => {
        if (err) { done(err) }
        const foodCount = Object.keys(app.locals.foods).length
        assert.equal(foodCount, 1)
        assert.include(res.body, "banana already exists!")
        assert.equal(res.statusCode, 422)
        done()
      })
    })
  })
})