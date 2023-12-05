let button = document.querySelectorAll(".drum")
for (let ps = 0; ps < 7; ps++){
    var audio = new Audio('./sounds')
}
for (let pos in button){
    button[pos].addEventListener('click',() => {
        audio.play()
    })
}
