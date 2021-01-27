

function Screen(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.width = 400;
    this.height = 657;
    var dis = this;

    this.createStartScreen = function() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        // var background = document.getElementById('background');
        this.ctx.drawImage(startScreen,0,0,this.width,this.height);

        this.pickup = new Pickup(canvas, 21,10);
        this.pickup.draw();

        canvas.addEventListener('click', function(event) {
            dis.g = new Game(dis.canvas);
            dis.g.init();
          });
    }
}

loadMedia=8;
doodleRight = new Image();
doodleRight.src = "./images/lik-right.png";
doodleRight.addEventListener("load",loadCount,false);

doodleLeft = new Image();
doodleLeft.src = "./images/lik-left.png";
doodleLeft.addEventListener("load",loadCount,false);

doodleShoot = new Image();
doodleShoot.src = "./images/lik-shoot.png";
doodleShoot.addEventListener("load",loadCount,false);

tile = new Image();
tile.src = "./images/tile.png";
tile.addEventListener("load",loadCount,false);

tileBlue = new Image();
tileBlue.src = "./images/tile-blue.png";
tileBlue.addEventListener("load",loadCount,false);

topScore = new Image();
topScore.src = "./images/top-score.png";
topScore.addEventListener("load",loadCount,false);

gameTiles = new Image();
gameTiles.src = "./images/game-tiles.png";
gameTiles.addEventListener("load",loadCount,false);

startScreen = new Image();
startScreen.src = "./images/start-screen.jpg";
startScreen.addEventListener("load",loadCount,false);

function loadCount(){
    loadMedia--;
    if(loadMedia==0){
        screen.createStartScreen();
    }
        
}
var screen = new Screen(canvas);
