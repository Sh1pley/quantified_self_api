describe('Food items', function() {

  before(function(){
    localStorage = document.getElementById("foods-frame").contentWindow.localStorage;
  })

  beforeEach(function() {
    foods = [];
  })

  context('#Food', function() {
    it('initializes a food object with name and calories', function() {
      var name = 'banana';
      var calories = 80;
      myFood = new Food(name, calories)

      assert.equal(myFood.name, name);
      assert.equal(myFood.calories, calories);
    });
  });

  context('#setFoods', function() {
    it('will initialize foods an empty based on local storage', function() {
      setFoods();
      var expectedFoods = JSON.parse(localStorage.getItem('foodList'));
      assert.deepEqual(foods, expectedFoods);
    });
  });

  context('#storeFood', function() {
    it('updates foods', function() {
      newFood = new Food('banana', 80);
      var expectedFoods = [];
      expectedFoods.push(newFood);

      storeFood('banana', 80);
      assert.deepEqual(foods, expectedFoods);
    });
  });

  context('#removeFood', function() {
    it('removes a single food', function() {
      storeFood('banana', 80);
      removeFood('banana');

      assert.deepEqual(foods, []);
    });

    it('removes a food but leaves other food', function() {
      newFood = new Food('apple', 60);
      var expectedFoods = [];
      expectedFoods.push(newFood);

      storeFood('banana', 80);
      storeFood('apple', 60);

      removeFood('banana');

      assert.deepEqual(foods, expectedFoods);
    });
  });

  context('#updateCalories', function() {
    it('changes the calories on a food', function() {
      newFood = new Food('apple', 60);
      var expectedFoods = [];
      expectedFoods.push(newFood);

      storeFood('apple', 80);
      updateCalories('apple', 60)
      
      assert.deepEqual(foods, expectedFoods);
    });
  });

  context('#updateName', function() {
    it('changes the name on a food', function() {
      newFood = new Food('apple', 60);
      var expectedFoods = [];
      expectedFoods.push(newFood);

      storeFood('apple', 60);
      updateName('banana', 'apple')
      
      assert.deepEqual(foods, expectedFoods);
    });
  });

  context('#sortFoodsAscending', function() {
    it('sorts foods from least calories to most calories', function() {
      var firstFood = new Food('apple', 60);
      var secondFood = new Food('banana', 80);
      var thirdFood = new Food('peach', 100);

      var expectedFoods = [];
      expectedFoods.push(firstFood);
      expectedFoods.push(secondFood);
      expectedFoods.push(thirdFood);

      storeFood('apple', 60);
      storeFood('banana', 80);
      storeFood('peach', 100);
      sortFoodsAscending();
      
      assert.deepEqual(foods, expectedFoods);
    });
  });

  context('#sortFoodsDescending', function() {
    it('sorts foods from most calories to least calories', function() {
      var firstFood = new Food('apple', 60);
      var secondFood = new Food('banana', 80);
      var thirdFood = new Food('peach', 100);

      var expectedFoods = [];
      expectedFoods.push(thirdFood);
      expectedFoods.push(secondFood);
      expectedFoods.push(firstFood);

      storeFood('apple', 60);
      storeFood('banana', 80);
      storeFood('peach', 100);
      sortFoodsDescending();
      
      assert.deepEqual(foods, expectedFoods);
    });
  });

  context('#sortFoods', function() {
    it('increments sortIndex', function() {
      sortIndex = 0;
      sortFoods();
      
      assert.equal(sortIndex, 1);

      sortFoods();
      
      assert.equal(sortIndex, 2);

      sortFoods();
      
      assert.equal(sortIndex, 3);
    });
  });
});
