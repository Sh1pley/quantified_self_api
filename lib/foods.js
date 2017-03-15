var foods;
var sortIndex;

$('document').ready(function() {
  setFoods();
  sortIndex = 0;

  addFoodOrWarning();
  filterRows();
  deleteFood();
  displayFoods();
  caloriesSort();
})

function deleteFood() {
  $('table').on('click', '.food-delete', function() {
    var name = $(this).siblings('.food-name').text();
    $(this).parents('tr').remove();
    removeFood(name);
  })
}

function removeFood(name) {
  for (var i = 0; i < foods.length; i++) {
    if (foods[i].name === name) {
      foods.splice(i, 1);
      updateFoodsStorage();
      return true
    }
  }
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
  $('.add-food').on('click', function() {
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
  var row = "<tr class='food-row'>" +
            "<td class='food-name'><span contenteditable='true'>" + 
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
    foods = JSON.parse(localStorage.getItem('foodList'));
  } else {
    foods = [];
  }
}

function storeFood(name, calories) {
  foods.push(new Food(name, calories));
  updateFoodsStorage();
}

function updateFoodsStorage() {
  localStorage.setItem('foodList', JSON.stringify(foods));
}

function Food(name, calories) {
  this.name = name;
  this.calories = calories;
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

function sortFoods() {
  if (sortIndex % 3 === 0) { sortFoodsAscending(); }
  else if (sortIndex % 3 === 1) { sortFoodsDescending(); }
  else { setFoods(); }
  sortIndex++;
}

function sortFoodsAscending() {
  foods.sort(function(foodOne, foodTwo){
    return foodTwo.calories - foodOne.calories
  });
}

function sortFoodsDescending() {
  foods.sort(function(foodOne, foodTwo){
    return foodOne.calories - foodTwo.calories
  });
}
