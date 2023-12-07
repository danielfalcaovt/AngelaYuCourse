function randomN(){
    let random = Math.floor(Math.random()* 3 )
    return random
}                
//AO PRESSIONAR A TECLA A COMEÇAMOS O JOGO

$(document).keydown(function(event){
    if (event.key === "a"){
        game()
    }else if(event.key ==="A"){
        game()
    }
})
let level = 1
function game(){
    //SE JOGO ESTIVER ROLANDO 
    if ($(".btn").hasClass("square")){
        $("h1").text("Game is already running...")
        
        
        //JOGO :
    }else{
        
        $("h1").text("Level: " + level)    
        
            //CADA QUADRADO RECEBE UM VALOR DE 1 A 4
            let array = ['red','green','yellow','blue']
            
        // UM NUMERO ALEATORIO E GERADO
            let randomArrayNumber = randomN()
        $(".btn"+"#"+array[randomArrayNumber]).addClass("square")
        // O QUADRADO COM O CLASS PISCA
    $(".square").addClass("pressed")
    setTimeout(() => {
        $(".square").removeClass("pressed")
    }, 100);
// AO CLICAR NO QUADRADO AVANÇAMOS UM NIVEL
    $(".btn").on("click",function(){
        $(this).addClass("pressed")
        setTimeout(() => {
            $(this).removeClass("pressed")
        }, 150);
        // AO AVANÇAR O NIVEL MAIS UM QUADRADO PISCA
        if($(this).hasClass("square")){
            level++
            $("h1").text("Level: " + level)
            randomArrayNumber = randomN()
        
            $(".square").addClass("pressed")
    setTimeout(() => {
        $(".square").removeClass("pressed")
    }, 100);
        $(".btn").removeClass("square")
        $(".btn" + "#" + array[randomArrayNumber]).addClass("square")
        setTimeout(() => {
            
            $(".square").addClass("pressed")
                setTimeout(() => {
                    $(".square").removeClass("pressed")
                }, 100);
        }, 200);
    
        
   
        }else{

            $("body").addClass("game-over")

            setTimeout(() => {
                $("body").removeClass("game-over")
            }, 150);

            // SE ERRAR O QUADRADO VOLTAMOS DO INICIO
            $("h1").text("Game Over!! Restarting...")
                setTimeout(() => {
                location.reload()
            }, 2000);
        }
        }
    )
}}