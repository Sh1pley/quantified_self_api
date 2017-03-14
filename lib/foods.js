var foods;

$('document').ready(function() {
  addFoodOrWarning();
  filterRows();
  deleteRow();
  displayFoods();
})


function deleteRow() {
  $('table').on('click', '.food-delete', function() {
    $(this).parents('tr').remove();
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

function addFoodOrWarning() {
  $('#add-food').on('click', function() {
    $('.validation-error').empty()
    var name = $('#name-field input').val();
    var calories = $('#calories-field input').val();
    if (name.length > 0 && calories.length > 0) {
      prependRow(name, calories);
      storeFood(name, calories);
    } else {
      raiseErrors(name, calories)
    }
  })
}

function prependRow(name, calories) {
  var row = "<tr class='food-row'> <td class='food-name'><span contenteditable='true'>" + 
            name + 
            "</span></td> <td class='food-calories'><span contenteditable='true'>" + 
            calories + 
            "</span></td> <td class='food-delete'><button>-</button></td>";
  $('#food-list').prepend(row);
  $('#name-field input, #calories-field input').val('');
}

function raiseErrors(name, calories) {
  if (name.length == 0) {
    $('#name-field .validation-error').html('Please Enter a Name');
  }
  if (calories.length == 0) {
    $('#calories-field .validation-error').html('Please Enter Calories');
  }
}

function setFoods() {
  if (localStorage.getItem('foodList')) {
    return JSON.parse(localStorage.getItem('foodList'));
  } else {
    return [];
  }
}

function storeFood(name, calories) {
  foods.push(new Food(name, calories));
  localStorage.setItem('foodList', JSON.stringify(foods));
}

function Food(name, calories) {
  this.name = name;
  this.calories = calories;
}

function displayFoods() {
  foods = setFoods();
  foods.forEach(function(foodItem) {
    prependRow(foodItem.name, foodItem.calories);
    return true;
  })
}
