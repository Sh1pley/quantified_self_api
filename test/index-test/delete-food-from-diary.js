describe('Delete foods from diary meals', function() {
  var $;
  var localStorage;

  before(function() {
    $ = document.getElementById('foods-frame').contentWindow.$;
  });

  before(function() {
    food = {name: 'delicious pie', calories: '9000'}
    var row = "<tr class='food-row'>" +
      "<td><input type='checkbox'/></td>" +
      "<td class='food-name'>" + 
      food.name + 
      "</span></td> <td class='food-calories'>" + 
      food.calories
    $('#diary-food-list tbody').html('');
    $('#diary-food-list').prepend(row);
  });

  context('can delete food once its in a meal table', function() {

    it('can remove a food from breakfast table', function() {
      $('#breakfast-list tbody').html('');
      $(':checkbox:first').prop('checked', true);
      $('#breakfast').click()
      var food = $('#breakfast-list tr.food-row').children('.food-name');
      assert.equal(food.text(), 'delicious pie')
      $('#breakfast-list tr button').click()
      var newFood = $('#breakfast-list tr.food-row').children('.food-name')
      assert.equal(newFood.length < 1, true);
    });

    it('can remove a food from lunch table', function() {
      $('#lunch-list tbody').html('');
      $(':checkbox:first').prop('checked', true);
      $('#lunch').click()
      var food = $('#lunch-list tr.food-row').children('.food-name');
      assert.equal(food.text(), 'delicious pie')
      $('#lunch-list tr button').click()
      var newFood = $('#lunch-list tr.food-row').children('.food-name')
      assert.equal(newFood.length < 1, true);
    });

    it('can remove a food from snack table', function() {
      $('#snack-list tbody').html('');
      $(':checkbox:first').prop('checked', true);
      $('#snack').click()
      var food = $('#snack-list tr.food-row').children('.food-name');
      assert.equal(food.text(), 'delicious pie')
      $('#snack-list tr button').click()
      var newFood = $('#snack-list tr.food-row').children('.food-name')
      assert.equal(newFood.length < 1, true);
    });

    it('can remove a food from dinner table', function() {
      $('#dinner-list tbody').html('');
      $(':checkbox:first').prop('checked', true);
      $('#dinner').click()
      var food = $('#dinner-list tr.food-row').children('.food-name');
      assert.equal(food.text(), 'delicious pie')
      $('#dinner-list tr button').click()
      var newFood = $('#dinner-list tr.food-row').children('.food-name')
      assert.equal(newFood.length < 1, true);
    });
  });
});