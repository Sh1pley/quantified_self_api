function addFoodOrWarning() {
  $('#add-food').on('click', function() {
    $('.validation-error').empty()
    var name = $('#name-field input').val();
    var calories = $('#calories-field input').val();
    var table = $('#food-list')
    if (name.length > 0 && calories.length > 0) {
      prependRow(name, calories);
      storeFood(name, calories);
    } else {
      raiseErrors(name, calories)
    }
  })
}

function raiseErrors(name, calories) {
  if (name.length == 0) {
    $('#name-field .validation-error').html('Please Enter a Name');
  }
  if (calories.length == 0) {
    $('#calories-field .validation-error').html('Please Enter Calories');
  }
}