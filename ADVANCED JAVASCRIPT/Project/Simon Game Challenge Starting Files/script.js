
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

//3. At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = [];

//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

    $(this).addClass("pressed")
    setTimeout(() => {
        $(this).removeClass("pressed")
    }, 150);
  //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");
  //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);
 
  console.log(userClickedPattern)
  if (gamePattern.length == userClickedPattern.length){
      for (let pos in gamePattern){
      for (let ps in userClickedPattern){
          if (gamePattern[pos] == userClickedPattern[ps] && gamePattern == userClickedPattern){
                alert("igual")
                nextSequence()
            }else{
                alert("error")
            }
        }
    }

  }else{
    
  }

  console.log(userClickedPattern);
  });

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  
  setTimeout(() => {
      $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
      var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
      audio.play();
    
  }, 250);
}

$(document).keydown(function(event){
    if (event.key == "A"){
        nextSequence()
        console.log(gamePattern)
    }
})