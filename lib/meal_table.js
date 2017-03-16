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

function setMeal(mealName) {
  if (diaryDay[mealName]) {
    return diaryDay[mealName];
  } else {
    return [];
  }
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

function clearAllMeals() {
  clearMeal('breakfast');
  clearMeal('lunch');
  clearMeal('snack');
  clearMeal('dinner');
}

function populateMeals() {
  displayMeal('breakfast');
  displayMeal('lunch');
  displayMeal('snack');
  displayMeal('dinner');
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