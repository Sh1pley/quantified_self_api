function enableMealButtons() {
  enableMealButton('breakfast');
  enableMealButton('lunch');
  enableMealButton('snack');
  enableMealButton('dinner');
}


function enableMealButton(mealName) {
  $('button#' + mealName).on('click', function() {
    var mealList = addMeal(mealName);
    persistDiary(mealList, mealName);
    updateTotals();
  })
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