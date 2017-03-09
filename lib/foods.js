$('document').ready(function() {
  $("#add-food").on('click', function() {

    $('.validation-error').empty()
    var name = $('#name-field input').val();
    var calories = $('#calories-field input').val();

    if (name.length > 0 && calories.length > 0) {
      prependRow(name, calories);
    } else {
      raiseErrors(name, calories)
    }
  })
})

function prependRow(name, calories) {
  var row = "<tr class='food-row'> <td class='food-name'>" + 
            name + 
            "</td> <td class='food-calories'>" + 
            calories + 
            "</td> <td class='food-delete'><button>-</button></td>";
  $('tbody').prepend(row);
  $('#name-field input').val("");
  $('#calories-field input').val("");
}

function raiseErrors(name, calories) {
  if (name.length == 0) {
    $('#name-field .validation-error').html('Please Enter a Name');
  }
  if (calories.length == 0) {
    $('#calories-field .validation-error').html('Please Enter Calories');
  }
}
