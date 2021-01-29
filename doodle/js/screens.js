var gameState = "start";
var restart = false;
function Screen(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.width = 400;
    this.height = 657;
    var dis = this;

    this.init = function() {
        this.createMainMenu();
         this.g = new Game(dis.canvas);

        this.addListeners();

    }

    this.createMainMenu = function() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        // var background = document.getElementById('background');
        this.ctx.drawImage(startScreen,0,0,this.width,this.height);
    }

    this.addListeners = function() {
        

        canvas.addEventListener('click', function(e) {
            console.log(e);
            if(gameState == "start"){
                if(e.offsetX >= 69 && e.offsetX <= 194 && e.offsetY <= 222 && e.offsetY >= 183) {
                    if(restart){
                        dis.g.resetGame();
                    }
                    else{
                        dis.g.init();
                    }
                    
                    
                }
                else if(e.offsetX >= 104 && e.offsetX<= 232 && e.offsetY >= 266 && e.offsetY <= 310) {
                    console.log("controls");
                }
            }
            if(gameState == "paused") {
                if(e.offsetX >= 200 && e.offsetX <= 610 && e.offsetY >= 500 && e.offsetY <= 541){
                    dis.g.update();
                    console.log('ss')
                    gameState = "playing";
                }
               
            }  
            if(gameState == "playing"){
                if(e.offsetX >= 373 && e.offsetX <= 382 && e.offsetY >= 6 && e.offsetY <= 20) {
                    console.log("pause");
                    dis.g.createPauseScreen();
                    gameState = "paused";
                }
            }
            if(gameState == "gameover") {
                if(e.offsetX >= 150 && e.offsetX <= 260 && e.offsetY >= 450 && e.offsetY <= 491) {
                    console.log("play again");
                    dis.g.resetGame();
                }
                else if (e.offsetX >= 150 && e.offsetX <= 260 && e.offsetY >= 500 && e.offsetY <= 541) {
                    console.log("menu");
                    dis.createMainMenu();
                    gameState = "start";
                    restart = true;
                }
            }
                     
        });
    }

   
}

loadMedia = 13;
doodleRight = new Image();
doodleRight.src = "./images/lik-right.png";
doodleRight.addEventListener("load",loadCount,false);

doodleLeft = new Image();
doodleLeft.src = "./images/lik-left.png";
doodleLeft.addEventListener("load",loadCount,false);

doodleShoot = new Image();
doodleShoot.src = "./images/lik-shoot.png";
doodleShoot.addEventListener("load",loadCount,false);

doodleRightSpring = new Image();
doodleRightSpring.src = "./images/lik-right-spring.png";
doodleRightSpring.addEventListener("load",loadCount,false);

doodleLeftSpring = new Image();
doodleLeftSpring.src = "./images/lik-left-spring.png";
doodleLeftSpring.addEventListener("load",loadCount,false);

doodleShootSpring = new Image();
doodleShootSpring.src = "./images/lik-shoot-spring.png";
doodleShootSpring.addEventListener("load",loadCount,false);


doodleLeftJetpack = new Image();
doodleLeftJetpack.src = "./images/lik-left-jetpack.png";
doodleLeftJetpack.addEventListener("load",loadCount,false);


doodleRightJetpack = new Image();
doodleRightJetpack.src = "./images/lik-right-jetpack.png";
doodleRightJetpack.addEventListener("load",loadCount,false);

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
        screen.init();
    }
        
}
var screen = new Screen(canvas);
