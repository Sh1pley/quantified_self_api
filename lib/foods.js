var sortIndex;

$('document').ready(function() {
  sortIndex = 0;

  setFoods();
  addFoodOrWarning();
  filterRows();
  deleteFood();
  displayFoods();
  caloriesSort();
  changeFood();
  blurOnEnter();
})
