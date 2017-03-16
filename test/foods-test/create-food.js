describe('#create-form', function() {
  var $;
  var localStorage;

  before(function(){
    $ = document.getElementById("foods-frame").contentWindow.$;
    localStorage = document.getElementById("foods-frame").contentWindow.localStorage;
  })

  beforeEach(function() {
    $('#food-list tbody').html('');
    $('#create-form input').val('');
    $('.validation-error').html('');
  });

  context('validations', function() {

    it('will tell me if I fail to enter a name', function() {
      $('#calories-field input').val('35');
      $('#add-food').click();
      var nameValidationContent = $("#name-field .validation-error").text();
      assert.equal(nameValidationContent, "Please Enter a Name");
    });

    it('will tell me if I fail to enter calories', function() {
      $('#name-field input').val('Banana');
      $('#add-food').click();
      var caloriesValidationContent = $("#calories-field .validation-error").text();
      assert.equal(caloriesValidationContent, "Please Enter Calories");
    });

    it('will clear validations after adding a food', function() {
      $('#name-field input').val('Banana');
      $('#calories-field input').val('35');
      $('#add-food').click();

      var nameValidationContent = $("#name-field .validation-error").text();
      assert.equal(nameValidationContent, "");

      var caloriesValidationContent = $("#calories-field .validation-error").text();
      assert.equal(caloriesValidationContent, "");
    });
  });

  context('adding a food', function() {

    beforeEach(function() {
      food = {name: 'Banana', calories: '35'}
      $('#name-field input').val(food.name);
      $('#calories-field input').val(food.calories);
      $('#add-food').click();
    });

    it('will save the food to local storage', function() {
      var savedFoods = JSON.parse(localStorage.getItem('foodList'));
      var lastIndex = savedFoods.length - 1;
      var savedFood = savedFoods[lastIndex];

      assert.isArray(savedFoods);
      assert.isObject(savedFood);
      assert.deepEqual(savedFood, food);
    });

    it('will add the food to the table', function() {
      var displayedName = $('.food-name').first().text();
      var displayedCalories = $('.food-calories').first().text();

      assert.equal(displayedName, food.name);
      assert.equal(displayedCalories, food.calories);
    });
  });
});
