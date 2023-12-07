//3. At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColours = ["red", "blue", "green", "yellow"];

let userChosen = ""

//5. At the top of the game.js file, create a new empty array called gamePattern.
var gamePattern = [];

//1. Inside game.js create a new function called nextSequence()
function nextSequence() {
    
    //2. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
    var randomNumber = Math.floor(Math.random() * 4);
    
    //4. Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
    var randomChosenColour = buttonColours[randomNumber];
    
    //6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
    gamePattern.push(randomChosenColour);
    
}

//ESCOLHA DO USUARIO
//PADRAO DO JOGO

/* SE CADA ESCOLHA DO USUARIO FOR IGUAL
    A CADA POSIÇAO DO PADRAO DO JOGO
    ATE O FIM DO LAÇO ADICIONAR +1 COR
    AO FINAL DO ARRAY
*/

nextSequence()

function showPattern(){
    for (let pos in gamePattern){
    $("#"+gamePattern[pos]).
    }
}

function game(){
    for (let pos= 0; pos<gamePattern.length;){
        $(".btn").click(function(){
            userChosen = $(this).attr("id")    
        })

        if(userChosen == gamePattern[pos]){
            pos++
        }else{
            break
        }
    }
}