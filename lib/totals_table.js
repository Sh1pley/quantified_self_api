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





