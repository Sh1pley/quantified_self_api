var diaryDay;

$("document").ready(function() {
  time = moment();

  setFoods();
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
