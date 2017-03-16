var time;

function setDiaryDay() {
  var currentDay = time.format("dddd, MMMM Do YYYY");
  if (localStorage.getItem(currentDay)) {
    diaryDay = JSON.parse(localStorage.getItem(currentDay));
  } else {
    diaryDay = {};
  }
}

function displayDay() {
  $('.current-day section').html(time.format("dddd, MMMM Do YYYY"));
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
