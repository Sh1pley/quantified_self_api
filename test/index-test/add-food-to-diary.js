describe('Select food and add to meals', function() {
  var $;
  var localStorage;

  before(function(){
    $ = document.getElementById("foods-frame").contentWindow.$;
    localStorage = document.getElementById("foods-frame").contentWindow.localStorage;
  });

  before(function() {
    food = {name: 'pizza', calories: '100'}
    var row = "<tr class='food-row'>" +
        "<td><input type='checkbox'/></td>" +
        "<td class='food-name'>" + 
        food.name + 
        "</span></td> <td class='food-calories'>" + 
        food.calories
    $('#diary-food-list tbody').html('');
    $('#diary-food-list').prepend(row);
  });

  context('can select foods from list', function() {

    it('can check a food item from the main list', function() {
      $(':checkbox').prop('checked', true);
      var checked = $(':checked').length;
      assert.equal(checked, 1)
    });
  });

  context('it can add food to meals', function() {

    it('can add a food to breakfast', function() {
      $(':checkbox').prop('checked', true);
      $('#breakfast').click();
      var breakfastRow = $('#breakfast-list tr.food-row');
      assert.equal(breakfastRow.length > 0, true)
    });

    it('can add a food to lunch', function() {
      $(':checkbox').prop('checked', true);
      $('#lunch').click();
      var lunchRow = $('#lunch-list tr.food-row');
      assert.equal(lunchRow.length > 0, true)
    });

    it('can add a food to snack', function() {
      $(':checkbox').prop('checked', true);
      $('#snack').click();
      var snackRow = $('#snack-list tr.food-row');
      assert.equal(snackRow.length > 0, true)
    });

    it('can add a food to dinner', function() {
      $(':checkbox').prop('checked', true);
      $('#dinner').click();
      var dinnerRow = $('#dinner-list tr.food-row');
      assert.equal(dinnerRow.length > 0, true)
    });

    it('can persist tables after reload', function(){
      var tableRows = $('tr.food-row');
      assert.equal(tableRows.length > 0, true)
      reloadPageOnce();
      var newTableRows = $('tr.food-row');
      assert.equal(tableRows.length, newTableRows.length)
    });
  });
});

function reloadPageOnce() {
  for (var i = 0; i < 1; i++) {
    window.onload=initReload;function initReload() {
      window.location.reload();
    }
  }
}