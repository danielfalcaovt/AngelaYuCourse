let audio = ['crash.mp3','kick-bass.mp3','snare.mp3','tom-1.mp3','tom-2.mp3','tom-3.mp3','tom-4.mp3']
let sounds = []
let numberButtons = document.querySelectorAll('.drum').length
for (let ps in audio){
    sounds.push(new Audio(`./sounds/${audio[ps]}`))
}
for (let pos = 0;pos<numberButtons;pos++){
    document.querySelectorAll('.drum')[pos].addEventListener('click', function () {
        this.style.color = 'white'
    })
}