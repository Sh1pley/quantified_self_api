var time = moment();
var diaryDay;

$("document").ready(function() {
  displayDay();
  dayButtons();
  displayDiaryFoods();
  setDiaryDay();
  populateMeals();
  updateTotals();
})

function displayMeal(mealName) {
  var meal = diaryDay[mealName];
  if (meal){
    meal.forEach(function(food){
      addMealRow(mealName, food.name, food.calories);
    })
  }
}

function enableMealButton(mealName) {
  $('button#' + mealName).on('click', function() {
    var mealList = addMeal(mealName);
    updateTotals();
    persistDiary(mealList, mealName);
  })
}

function setDiaryDay() {
  var currentDay = time.format("dddd, MMMM Do YYYY");
  if (localStorage.getItem(currentDay)) {
    diaryDay = JSON.parse(localStorage.getItem(currentDay));
  } else {
    diaryDay = {};
  }
}

function persistDiary(mealList, mealName) {
  var currentDay = time.format("dddd, MMMM Do YYYY");
  var meal = setMeal(mealName);
  meal = meal.concat(mealList);
  diaryDay[mealName] = meal;
  localStorage.setItem(currentDay, JSON.stringify(diaryDay));
}

function setMeal(mealName) {
  if (diaryDay[mealName]) {
    return diaryDay[mealName];
  } else {
    return [];
  }
}

function addMeal(table) {
  var mealList = [];
  var selectedFoods = $(':checked').parent().parent();
  Array.from(selectedFoods).forEach(function(foodRow){
    mealList.push(diaryFood(table,foodRow));
  })
  clearCheckbox();
  return mealList;
}

function diaryFood(table,foodRow) {
  var name = $(foodRow).children('.food-name').text();
  var calories = $(foodRow).children('.food-calories').text();
  addMealRow(table, name, calories);
  return new Food(name, calories);
}

function addMealRow(table, name, calories) {
  var row = "<tr class='food-row'>" +
            "<td class='food-name'>" + 
            name + 
            "</span></td> <td class='food-calories'>" + 
            calories + 
            "</span></td> <td class='food-delete'><button>-</button></td>";
  $('#' + table + '-list').prepend(row);
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

function updateTotals() {
  calculateCalorieSums();
  populateTotalsTable();
  addColorToRemainingCalories();
}

function populateMeals() {
  enableMealButton('breakfast');
  enableMealButton('lunch');
  enableMealButton('snack');
  enableMealButton('dinner')
  displayMeal('breakfast');
  displayMeal('lunch');
  displayMeal('snack');
  displayMeal('dinner');
}

function clearCheckbox() {
  $(':checked').prop('checked', false);
}