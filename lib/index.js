var time = moment();

$("document").ready(function() {
  calculateCalorieSums();
  populateTotalsTable();
  addColorToRemainingCalories();
  displayDay();
  dayButtons();
})

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

