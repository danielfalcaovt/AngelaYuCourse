let button = document.querySelectorAll(".drum")
    var audios = ['crash.mp3','kick-bass.mp3','snare.mp3','tom-1.mp3','tom-2.mp3','tom-3.mp3','tom-4.mp3']
    var sounds = []
    for (let pos = 0; pos< 7; pos++){
        sounds.push(new Audio(`./sounds/${audios[pos]}`))
    }
    async function playmusic(){
        try {
for (let pos in button){
    button[pos].addEventListener('click',() => {

                
               await sounds[pos].play()
               button.classList.add('playing')
            }catch(err){
                button.classList.remove('playing')
            }
        
}
