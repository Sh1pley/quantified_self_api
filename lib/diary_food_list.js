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

function clearCheckbox() {
  $(':checked').prop('checked', false);
}

function filterDiaryRows() {
  $('#food-filter input').keyup(function() {
    var rows = $('#diary-food-list tr.food-row');
    var filter = $('#food-filter input').val().toLowerCase();
    rows.hide();
    showDiaryRows(filter, rows);
  })
}

function showDiaryRows(filter, rows) {
  rows.each(function() {
    var name = $(this).children('.food-name').text().toLowerCase();
    if (name.indexOf(filter) >= 0) {
      $(this).show();
    }
  });
}
