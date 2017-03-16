function deleteFood() {
  $('table#food-list').on('click', '.food-delete', function() {
    var name = $(this).siblings('.food-name').text();
    $(this).parents('tr').remove();
    removeFood(name);
  })
}

function filterRows() {
  $('#food-filter input').keyup(function() {
    var rows = $('tr.food-row');
    var filter = $('#food-filter input').val().toLowerCase();
    rows.hide();
    showRows(filter, rows);
  })
}

function showRows(filter, rows) {
  rows.each(function() {
    var name = $(this).children('.food-name').text().toLowerCase();
    if (name.indexOf(filter) >= 0) {
      $(this).show();
    }
  });
}

function prependRow(name, calories) {
  var row = "<tr class='food-row'>" +
            "<td class='food-name'><span contenteditable='true'>" + 
            name + 
            "</span></td> <td class='food-calories'><span contenteditable='true'>" + 
            calories + 
            "</span></td> <td class='food-delete'><button>-</button></td>";
  $('#food-list').prepend(row);
  $('#name-field input, #calories-field input').val('');
}

function displayFoods() {
  foods.forEach(function(foodItem) {
    prependRow(foodItem.name, foodItem.calories);
    return true;
  })
}

function caloriesSort() {
  $('#sort-calories').on('click', function() {
    $('tr.food-row').hide();
    sortFoods();
    displayFoods();
  })
}

function changeFood() {
  var foodName;
  $('table#food-list').on('focus','span', function(event){
    foodName = $(this).parents('tr.food-row').children('td.food-name').text();
  });
  $('table#food-list').on('blur','span', function(event){
    var newValue = event.target.innerText;
    updateFood(foodName, newValue, event);
  });
}

function blurOnEnter(){
  $('table#food-list').keydown('span', function(event){
    if (event.keyCode == 13) {
      $(event.target).blur();
      return false;
    }
  });
}

function updateFood(foodName, newValue, event){
  if ($(event.target).parents('td.food-calories').text()) {
    updateCalories(foodName, newValue);
  } else {
    updateName(foodName, newValue);
  }
}
