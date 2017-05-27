var cake = {
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function(updateFunction) {
    // this here is the object cake, we use this to call an object's method
    var status = "Decorating with " + this.topping + ". Ready to eat soon!"
    updateFunction(status)
    setTimeout(function() {
      updateFunction(serve.apply(this, ["Happy Eating!", this.customer]))
    }.bind(this), 2000)
  }
}

// setTimeout delays the execution of a function while at the same time moving it out into a global context. The setTimeout function needs to be bound to the appropriate context, the cake.

var pie = {
  name: "Apple Pie",
  ingredients: ["apples", "flour", "eggs", "butter", "sugar"],
  topping: "streusel",
  bakeTemp: "350 degrees",
  bakeTime: "75 minutes",
  customer: "Tammy"
}

function makeCake() {
  var updateCakeStatus = updateStatus.bind(this)
  mix.call(cake, updateCakeStatus)
}

function makePie() {
  var updatePieStatus = updateStatus.bind(this);
  mix.call(pie, updatePieStatus)
  pie.decorate = cake.decorate.bind(pie)
}

function updateStatus(statusText) {
  this.getElementsByClassName("status")[0].innerText = statusText
}

function bake(updateFunction) {
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  updateFunction(status)
  setTimeout(function() {
    cool.call(this, updateFunction)
  }.bind(this), 2000)
}

function mix(updateFunction) {
  debugger
  var status = "Mixing " + this.ingredients.join(", ")
  updateFunction(status)
  setTimeout(function() {
    bake.call(this, updateFunction)
  }.bind(this), 2000)
}

function cool(updateFunction) {
  var status = "It has to cool! Hands off!"
  updateFunction(status)
  setTimeout(function() {
    this.decorate(updateFunction)
  }.bind(this), 2000)
}

function makeDessert() {
  // this in here is whatever link was clicked i.e. either cookLinks[0] or cookLinks[1]
  if (this === document.getElementsByClassName("js-make")[0]) {
    makeCake.call(document.getElementById("cake"))
  } else {
    makePie.call(document.getElementById("pie"))
  }
  debugger
}

function serve(message, customer) {
  //you shouldn't need to alter this function
  return(customer + ", your " + this.name + " is ready to eat! " + message)
}

document.addEventListener("DOMContentLoaded", function(event) {
  //you shouldn't need to alter this function
  var cookLinks = document.getElementsByClassName("js-make")
  for(var i=0; i<cookLinks.length; i++) {
    cookLinks[i].addEventListener("click", makeDessert)
  }
});
