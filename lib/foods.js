$('document').ready(function() {
  addFoodOrWarning();
  filterRows();
  deleteRow();
})

function deleteRow() {
  $('table').on('click', '.food-delete', function() {
    $(this).parents('tr').remove();
  })
}

function filterRows() {
  $('#food-filter input').keyup(function() {
    var rows = $('tr.food-row');
    var filter = $('#food-filter input').val().toLowerCase();
    rows.hide();
    showRows(filter, rows);
  })
}

function showRows(filter, rows) {
  rows.each(function() {
    var name = $(this).children('.food-name').text().toLowerCase();
    if (name.indexOf(filter) >= 0) {
      $(this).show();
    }
  });
}

function addFoodOrWarning() {
  $('#add-food').on('click', function() {
    $('.validation-error').empty()
    var name = $('#name-field input').val();
    var calories = $('#calories-field input').val();
    if (name.length > 0 && calories.length > 0) {
      prependRow(name, calories);
    } else {
      raiseErrors(name, calories)
    }
  })
}

function prependRow(name, calories) {
  var row = "<tr class='food-row'> <td class='food-name'><span contenteditable='true'>" + 
            name + 
            "</span></td> <td class='food-calories'><span contenteditable='true'>" + 
            calories + 
            "</span></td> <td class='food-delete'><button>-</button></td>";
  $('#food-list').prepend(row);
  $('#name-field input, #calories-field input').val('');
}

function raiseErrors(name, calories) {
  if (name.length == 0) {
    $('#name-field .validation-error').html('Please Enter a Name');
  }
  if (calories.length == 0) {
    $('#calories-field .validation-error').html('Please Enter Calories');
  }
}
