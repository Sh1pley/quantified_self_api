

$("document").ready(function() {
  var time = moment();
  $('.current-day section').html(time.format("dddd, MMMM Do YYYY"));
})