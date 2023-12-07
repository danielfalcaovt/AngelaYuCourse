
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

//3. At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = [];

//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

  //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");
  //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);
  console.log(gamePattern)
    console.log(userClickedPattern)
    let isTrue = ""
    for (let pos in userClickedPattern){
        for (let ps in gamePattern){
            if (gamePattern[ps]!=userClickedPattern[pos]&& gamePattern.length == userClickedPattern.length){
                
            }else{
                isTrue = true
            }
        }
    }
    if (isTrue == true){
        userClickedPattern = []
        nextSequence()
    }else{
        gamePattern = []
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