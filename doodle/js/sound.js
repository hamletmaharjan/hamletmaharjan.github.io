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
}


var jumpSound = new Sound("./audio/jump.wav", false);
var springShoeSound = new Sound("./audio/springshoes.mp3", false);
var jetpackSound = new Sound("./audio/jetpack1.mp3", false);
var bulletSound = new Sound("./audio/pucanje.mp3", false);
var propellerSound = new Sound("./audio/propeller1.mp3", false);
var monsterSound = new Sound("./audio/monsterblizu.mp3", false);