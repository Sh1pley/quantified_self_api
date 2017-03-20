describe('.food-delete', function() {
  var $;
  var localStorage;

  before(function(){
    $ = document.getElementById("foods-frame").contentWindow.$;
    localStorage = document.getElementById("foods-frame").contentWindow.localStorage;
  })

  beforeEach(function() {
    window.localStorage.clear();
    $('#food-list tbody').html('');
    $('.validation-error').html('');

    food = {name: 'Banana', calories: '35'}
    $('#name-field input').val(food.name);
    $('#calories-field input').val(food.calories);
    $('#add-food').click();
  });

  context('when clicked on a food', function() {
    it('will remove the food from the table', function() {
      $('.food-delete').click();
      var tableLength = $('#food-list tr.food-row').length

      assert.equal(tableLength, 0);
    });
  });
});
