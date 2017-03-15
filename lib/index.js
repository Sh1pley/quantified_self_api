var time = moment();

$("document").ready(function() {
  calculateCalorieSums();
  populateTotalsTable();
  addColorToRemainingCalories();
  displayDay();
  dayButtons();
  addBreakfast();
  addLunch();
  addSnack();
  addDinner();
  displayDiaryFoods();
})

function addDinner() {
  $('button#dinner').on('click', function() {
    addMeal('#dinner');
  })
}

function addBreakfast() {
  $('button#breakfast').on('click', function() {
    addMeal('#breakfast');
  })
}

function addLunch() {
  $('button#lunch').on('click', function() {
    addMeal('#lunch');
  })
}

function addSnack() {
  $('button#snack').on('click', function() {
    addMeal('#snack');
  })
}

function addMeal(tableID) {
  var selectedFoods = $(':checked').parent().parent();
  Array.from(selectedFoods).forEach(function(foodRow){
    var name = $(foodRow).children('.food-name').text();
    var calories = $(foodRow).children('.food-calories').text();
    addMealRow(tableID, name, calories);
  })
}

function addMealRow(tableID, name, calories) {
  var row = "<tr class='food-row'>" +
            "<td class='food-name'>" + 
            name + 
            "</span></td> <td class='food-calories'>" + 
            calories + 
            "</span></td> <td class='food-delete'><button>-</button></td>";
  $(tableID + '-list').prepend(row);
  $('#name-field input, #calories-field input').val('')
}

function addDiaryRow(name, calories) {
  var row = "<tr class='food-row'>" +
            "<td><input type='checkbox'/></td>" +
            "<td class='food-name'>" + 
            name + 
            "</span></td> <td class='food-calories'>" + 
            calories
  $('#diary-food-list').prepend(row);
  $('#name-field input, #calories-field input').val('');
}

function displayDiaryFoods() {
  foods.forEach(function(foodItem) {
    addDiaryRow(foodItem.name, foodItem.calories);
    return true;
  })
}

function dayButtons() {
  $('button.forward').on('click', function() {
    time = time.add(1, 'day');
    displayDay();
  });

  $('button.back').on('click', function() {
    time = time.add(-1, 'day');
    displayDay();
  });
}

function displayDay() {
  $('.current-day section').html(time.format("dddd, MMMM Do YYYY"));
}

function getDay() {
  var time = moment();
  $('.current-day section').html(time.day(1).format("dddd, MMMM Do YYYY"));

  $('.current-day section').on('click', function() {
    $('.current-day section').html(time.day(1).format("dddd, MMMM Do YYYY"));
  });
  $('button.forward').on('click', function() {
    $('.current-day section').html(time.day(2).format("dddd, MMMM Do YYYY"));
  });
  $('button.back').on('click', function() {
    $('.current-day section').html(time.day(0).format("dddd, MMMM Do YYYY"));
  });
}

function calculateCalorieSums() {
  calorieSum(400, 'breakfast');
  calorieSum(200, 'snack');
  calorieSum(600, 'lunch');
  calorieSum(800, 'dinner');
}

function calorieSum(goal, meal) {
  var tag = '#' + meal + '-list';
  var sum = findSum(tag + ' .food-calories')
  $(tag + ' .calorie-count').html(sum);
  $(tag + ' .remaining-count').html(goal - sum);
}

function findSum(identifier) {
  var sum = 0;
  $(identifier).each(function() {
    var value = $(this).text();
    if(!isNaN(value) && value.length != 0) {
      sum += parseFloat(value);
    }
  });
  return sum
}

function addColorToRemainingCalories() {
  $('.remaining-count').each(function() {
    addGreenOrRed($(this));
  })
}

function addGreenOrRed(element) {
  var remainingCalories = element.text();
  if (remainingCalories < 0) {
    element.addClass('red-text');
  }
  else {
    element.addClass('green-text');
  }
}

function populateTotalsTable() {
  var goalCalories = 2000;
  $('.goal-calories').text(goalCalories);

  var totalCalories = findSum('.calorie-count');
  $('.calories-consumed').text(totalCalories)

  $('#total-list .remaining-count').text(goalCalories - totalCalories)
}

