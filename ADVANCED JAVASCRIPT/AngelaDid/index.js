let numberButtons = document.querySelectorAll('.drum').length

for (let pos = 0;pos<numberButtons;pos++){
    document.querySelectorAll('.drum')[pos].addEventListener('click', function () {
        let key = this.innerHTML
        checkLetter(key)
        addAnimation(key)
    })

}
document.addEventListener('keydown', function(event){
    checkLetter(event.key)
    addAnimation(event.key)
})



    
    function checkLetter(bInnerHTML) {
        switch (bInnerHTML) {
            case 'w':
                var t1 = new Audio('./sounds/tom-1.mp3')
                t1.play()
                    break;
            case 'a':
                var t2 = new Audio('./sounds/tom-2.mp3')
                t2.play()
                    break;
            case 's':
                var t3 = new Audio('./sounds/tom-3.mp3')
                t3.play()
                    break;
            case 'd':
                var t4 = new Audio('./sounds/tom-4.mp3')
                t4.play()
                    break;
            case 'j':
                var snare = new Audio('./sounds/snare.mp3')
                snare.play()
                    break;
            case 'k':
                var crash = new Audio('./sounds/crash.mp3')
                crash.play()
                break;
            case 'l':
                var kick = new Audio('./sounds/kick-bass.mp3')
                kick.play()
                    break;
            default:
                console.log()
                break;
        }
    }


function addAnimation(key){
    let anime = document.querySelector('.' + key)
    anime.classList.add('pressed')
    setTimeout(() => {
        anime.classList.remove('pressed')
    },100);
}