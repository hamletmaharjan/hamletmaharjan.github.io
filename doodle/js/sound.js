/**
 * @param  {String} src - path to the audio
 * @param  {Boolean} loop - to loop the audio or not
 */
function Sound(src, loop) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  this.sound.loop = loop || false;
  document.body.appendChild(this.sound);

  this.play = function() {
    if(sounds == "on") {
      this.sound.play();
    }
  }

  this.stop = function() {
    this.sound.pause();
  }

  this.pause = function() {
    this.sound.pause();
  }
  
  this.resume = function() {
    this.sound.resume();
    console.log("resume sound");
  }
}


let jumpSound = new Sound("./audio/jump.wav", false);
let springShoeSound = new Sound("./audio/springshoes.mp3", false);
let jetpackSound = new Sound("./audio/jetpack1.mp3", false);
let bulletSound = new Sound("./audio/pucanje.mp3", false);
let propellerSound = new Sound("./audio/propeller1.mp3", false);
let monsterSound = new Sound("./audio/monsterblizu.mp3", false);
let trampolineSound = new Sound("./audio/trampoline.mp3", false);
let rocketSound = new Sound("./audio/rocket.mp3", false);
let fallingSound = new Sound("./audio/pada.mp3", false);
let woodenTileSound = new Sound("./audio/lomise.mp3", false);
let monsterCollisionSound = new Sound("./audio/monster-crash.mp3", false);