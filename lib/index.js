var time;
var diaryDay;

$("document").ready(function() {
  time = moment();

  displayDiaryFoods();
  dayButtons();
  displayForNewDay();
  enableMealButtons();
  enableAllDiaryDeleteButtons();
})

function displayForNewDay() {
  displayDay();
  setDiaryDay();
  populateMeals();
  updateTotals();
}

function enableMealButtons() {
  enableMealButton('breakfast');
  enableMealButton('lunch');
  enableMealButton('snack');
  enableMealButton('dinner');
}

function clearMeal(mealName) {
  $('#' + mealName + '-list tbody tr.food-row').remove();
}

function displayMeal(mealName) {
  var meal = diaryDay[mealName];
  if (meal) {
    meal.forEach(function(food){
      addMealRow(mealName, food.name, food.calories);
    })
  }
}

function enableMealButton(mealName) {
  $('button#' + mealName).on('click', function() {
    var mealList = addMeal(mealName);
    persistDiary(mealList, mealName);
    updateTotals();
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
  var meal = setMeal(mealName);
  meal = meal.concat(mealList);
  diaryDay[mealName] = meal;
  updateDiaryStorage();
}

function updateDiaryStorage() {
  var currentDay = time.format("dddd, MMMM Do YYYY");
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

function clearAllMeals() {
  clearMeal('breakfast');
  clearMeal('lunch');
  clearMeal('snack');
  clearMeal('dinner');
}

function dayButtons() {
  $('button#forward').on('click', function() {
    time = time.add(1, 'day');
    clearAllMeals();
    displayForNewDay();
  });

  $('button#back').on('click', function() {
    time = time.add(-1, 'day');
    clearAllMeals();
    displayForNewDay();
  });
}

function displayDay() {
  $('.current-day section').html(time.format("dddd, MMMM Do YYYY"));
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
    element.removeClass('green-text');
    element.addClass('red-text');
  }
  else {
    element.removeClass('red-text');
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
  displayMeal('breakfast');
  displayMeal('lunch');
  displayMeal('snack');
  displayMeal('dinner');
}

function clearCheckbox() {
  $(':checked').prop('checked', false);
}

function enableAllDiaryDeleteButtons() {
  enableMealDeleteButtons('snack');
  enableMealDeleteButtons('breakfast');
  enableMealDeleteButtons('lunch');
  enableMealDeleteButtons('dinner');
}

function enableMealDeleteButtons(mealName) {
  $('table#' + mealName + '-list').on('click', '.food-delete', function() {
    var name = $(this).siblings('.food-name').text();
    $(this).parents('tr').remove();
    removeFoodFromDiary(name, mealName);
    updateDiaryStorage();
    updateTotals();
  })
}

function removeFoodFromDiary(name, mealName) {
  foodsInMeal = diaryDay[mealName];
  for (var i = 0; i < foodsInMeal.length; i++) {
    if (foodsInMeal[i].name === name) {
      foodsInMeal.splice(i, 1);
      diaryDay[mealName] = foodsInMeal;
      return true
    }
  }
}