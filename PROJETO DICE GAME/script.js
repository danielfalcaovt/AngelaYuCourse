let randomnm = () => {
    return Math.round(Math.random() * 6 +1)
}  
let count = 0
function play(){
    //PEGAR DOIS NUMEROS ALEATORIOS
    let number1 = randomnm()
    let number2 = randomnm()
    // O MAIOR VENCE
    if (number1 > number2){
        diceanimation(number1,number2,1)
        pontosp1++
        p1.innerHTML = pontosp1
    }else if (number1 == number2){
        diceanimation(number1,number2,3)
    }else{
        diceanimation(number1,number2,2)
}

//ANIMAÇAO DADOS GIRANDO


   let dados = document.querySelector("div#dice1")
    let dados2 = document.querySelector("div#dice2")
    count += 40
    dados.style.transform = `rotateX(${count})`
/*  

    setTimeout(() => {
        
        dados.classList.add("dicerolls")
        dados2.classList.add("dicerolls")
    }, 200);
    setTimeout(() => {
        dados2.classList.remove("dicerolls")
        dados.classList.remove("dicerolls")
    }, 600); */
}

function diceanimation(number1,number2,n3){
setTimeout(() => {
    
    let d1 = document.querySelector("div.d1")
    let d2 = document.querySelector("div.d2")
    let d3 = document.querySelector("div.d3")
    let d4 = document.querySelector("div.d4")
    let d5 = document.querySelector("div.d5")
    let d6 = document.querySelector("div.d6")
    let d7 = document.querySelector("div.d7")

    if(number1 == 1){
        d1.style.display = "none"
        d2.style.display = "none"
        d3.style.display = "none"
        d4.style.display = "none"
        d5.style.display = "none"
        d6.style.display = "none"
        d7.style.display = "block"
    }else if(number1 == 2){
        d1.style.display = "block"
        d2.style.display = "none"
        d3.style.display = "none"
        d4.style.display = "none"
        d5.style.display = "none"
        d6.style.display = "block"
        d7.style.display = "none"  
    }else if(number1 == 3){
        d1.style.display = "block"
        d2.style.display = "none"
        d3.style.display = "none"
        d4.style.display = "none"
        d5.style.display = "none"
        d6.style.display = "block"
        d7.style.display = "block"
    }else if(number1 == 4){
        d1.style.display = "block"
        d2.style.display = "none"
        d3.style.display = "block"
        d4.style.display = "block"
        d5.style.display = "none"
        d6.style.display = "block"
        d7.style.display = "none"
    }else if(number1 == 5){
        d1.style.display = "block"
        d2.style.display = "none"
        d3.style.display = "block"
        d4.style.display = "block"
        d5.style.display = "none"
        d6.style.display = "block"
        d7.style.display = "block"
    }else if(number1 == 6){
        d1.style.display = "block"
        d2.style.display = "block"
        d3.style.display = "block"
        d4.style.display = "block"
        d5.style.display = "block"
        d6.style.display = "block"
        d7.style.display = "none"
    }
    
    
    let dado2_1 = document.querySelector(".p2.d1")
    let dado2_2 = document.querySelector(".p2.d2") 
    let dado2_3 = document.querySelector(".p2.d3")
    let dado2_4 = document.querySelector(".p2.d4")
    let dado2_5 = document.querySelector(".p2.d5")
    let dado2_6 = document.querySelector(".p2.d6")
    let dado2_7 = document.querySelector(".p2.d7")

    

    if(number2 == 1){
        dado2_1.style.display = "none"
        dado2_2.style.display = "none"
        dado2_3.style.display = "none"
        dado2_4.style.display = "none"
        dado2_5.style.display = "none"
        dado2_6.style.display = "none"
        dado2_7.style.display = "block"
    }else if(number2 == 2){
        dado2_1.style.display = "block"
        dado2_2.style.display = "none"
        dado2_3.style.display = "none"
        dado2_4.style.display = "none"
        dado2_5.style.display = "none"
        dado2_6.style.display = "block"
        dado2_7.style.display = "none"  
    }else if(number2 == 3){
        dado2_1.style.display = "block"
        dado2_2.style.display = "none"
        dado2_3.style.display = "none"
        dado2_4.style.display = "none"
        dado2_5.style.display = "none"
        dado2_6.style.display = "block"
        dado2_7.style.display = "block"
    }else if(number2 == 4){
        dado2_1.style.display = "block"
        dado2_2.style.display = "none"
        dado2_3.style.display = "block"
        dado2_4.style.display = "block"
        dado2_5.style.display = "none"
        dado2_6.style.display = "block"
        dado2_7.style.display = "none"
    }else if(number2 == 5){
        dado2_1.style.display = "block"
        dado2_2.style.display = "none"
        dado2_3.style.display = "block"
        dado2_4.style.display = "block"
        dado2_5.style.display = "none"
        dado2_6.style.display = "block"
        dado2_7.style.display = "block"
    }else if(number2 == 6){
        dado2_1.style.display = "block"
        dado2_2.style.display = "block"
        dado2_3.style.display = "block"
        dado2_4.style.display = "block"
        dado2_5.style.display = "block"
        dado2_6.style.display = "block"
        dado2_7.style.display = "none"
    }
}, 600);

    //SETANDO VITORIA

    //remoçao animacoes dados
    let dados = document.querySelector("div#dice1")
    let dados2 = document.querySelector("div#dice2")
    let txtwin = document.querySelector("header>h1")
    if (n3 == 1){
        txtwin.innerHTML = "Player 1 Wins!"

    }else if(n3 == 2){
        txtwin.innerHTML = "Player 2 Wins!"

    }else{
        txtwin.innerHTML = "Draw"
    }

   


}

