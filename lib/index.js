$("document").ready(function() {
  time = moment();

  setFoods();
  displayDiaryFoods();
  dayButtons();
  displayForNewDay();
  enableMealButtons();
  enableAllDiaryDeleteButtons();
  filterDiaryRows();
})

function displayForNewDay() {
  displayDay();
  setDiaryDay();
  populateMeals();
  updateTotals();
}
