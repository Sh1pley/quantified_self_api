function addColorToRemainingCalories() {
  $('.remaining-count').each(function() {
    addGreenOrRed($(this));
  })
}

function addGreenOrRed(element) {
  var remainingCalories = element.text();
  if (remainingCalories < 0) {
    element.removeClass('green-text');
    element.addClass('red-text');
  }
  else {
    element.removeClass('red-text');
    element.addClass('green-text');
  }
}