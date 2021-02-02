function Sound(src, loop) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.loop = loop || false;
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
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


var jumpSound = new Sound("./audio/jump.wav", false);
var springShoeSound = new Sound("./audio/springshoes.mp3", false);
var jetpackSound = new Sound("./audio/jetpack1.mp3", false);
var bulletSound = new Sound("./audio/pucanje.mp3", false);
var propellerSound = new Sound("./audio/propeller1.mp3", false);
var monsterSound = new Sound("./audio/monsterblizu.mp3", false);
var trampolineSound = new Sound("./audio/trampoline.mp3", false);
var rocketSound = new Sound("./audio/rocket.mp3", false);
var fallingSound = new Sound("./audio/pada.mp3", false);
var woodenTileSound = new Sound("./audio/lomise.mp3", false);