let audio = [
  "crash.mp3",
  "kick-bass.mp3",
  "snare.mp3",
  "tom-1.mp3",
  "tom-2.mp3",
  "tom-3.mp3",
  "tom-4.mp3",
];
let sounds = [];
let numberButtons = $(".drum").length;
for (let ps in audio) {
  sounds.push(new Audio(`./sounds/${audio[ps]}`));
}
for (let pos = 0; pos < numberButtons; pos++) {
  $(".drum")[pos].click(function () {
      let buttonpressed = this.innerHTML;
        sound(buttonpressed)
    });
}

function sound(key) {
  switch (key) {
    case "w":
      sounds[0].play();
      break;
    case "a":
      sounds[1].play();
      break;
    case "s":
      sounds[2].play();
      break;
    case "d":
      sounds[3].play();
      break;
    case "j":
      sounds[4].play();
      break;
    case "k":
      sounds[5].play();
      break;
    case "l":
      sounds[6].play();
      break;
  }
}
document.addEventListener("keypress", function (event) {
    sound(event.key)
});
