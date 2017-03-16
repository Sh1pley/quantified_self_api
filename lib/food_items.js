var foods;

function setFoods() {
  if (localStorage.getItem('foodList')) {
    foods = JSON.parse(localStorage.getItem('foodList'));
  } else {
    foods = [];
  }
}

function storeFood(name, calories) {
  foods.push(new Food(name, calories));
  updateFoodsStorage();
}

function updateFoodsStorage() {
  localStorage.setItem('foodList', JSON.stringify(foods));
}

function Food(name, calories) {
  this.name = name;
  this.calories = calories;
}

function removeFood(name) {
  for (var i = 0; i < foods.length; i++) {
    if (foods[i].name === name) {
      foods.splice(i, 1);
      updateFoodsStorage();
      return true
    }
  }
}

function updateCalories(foodName, newValue) {
  for (var i = 0; i < foods.length; i++){
    if (foods[i].name === foodName){
      foods[i].calories = newValue;
      updateFoodsStorage();
      return true;
    }
  }
}

function updateName(foodName, newValue) {
  for (var i = 0; i < foods.length; i++) {
    if (foods[i].name === foodName){
      foods[i].name = newValue;
      updateFoodsStorage();
      return true;
    }
  }
}

function sortFoods() {
  if (sortIndex % 3 === 0) { sortFoodsAscending(); }
  else if (sortIndex % 3 === 1) { sortFoodsDescending(); }
  else { setFoods(); }
  sortIndex++;
}

function sortFoodsAscending() {
  foods.sort(function(foodOne, foodTwo){
    return foodTwo.calories - foodOne.calories
  });
}

function sortFoodsDescending() {
  foods.sort(function(foodOne, foodTwo){
    return foodOne.calories - foodTwo.calories
  });
}
