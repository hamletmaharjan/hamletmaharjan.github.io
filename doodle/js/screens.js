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

    this.createControls = function() {
        gameState = "controls";
        this.ctx.drawImage(background,0,0,this.width,this.height);
        this.ctx.font = "20px Comic Sans MS";
        this.ctx.fillStyle = "black";
        // this.ctx.textAlign = "center";
        this.ctx.fillText("Press arrow keys to move left and right",10,300);
        this.ctx.fillText("Space key to shoot",100,350);
        this.ctx.drawImage(gameTiles , 724, 93, 110, 41, 200, 500, 110, 41);
    }

    this.createOptions = function() {
        gameState = "options";
        this.ctx.drawImage(background,0,0,this.width,this.height);
        this.ctx.font = "20px Comic Sans MS";
        this.ctx.fillStyle = "black";
        // this.ctx.textAlign = "center";
        this.ctx.fillText("Directional Shooting",50,200);
        if(directionalShooting == "on") {
            this.ctx.fillStyle = "black";
            this.ctx.fillText("OFF",120,225);
            this.ctx.fillStyle = "green";
            this.ctx.fillText("ON", 170, 225);

        }
        else {
            this.ctx.fillStyle = "green";
            this.ctx.fillText("OFF",120,225);
            this.ctx.fillStyle = "black";
            this.ctx.fillText("ON", 170, 225);
        }
        

        this.ctx.fillStyle = "black";
        this.ctx.fillText("Sounds",200,300);
        if(sounds == "on") {
            this.ctx.fillStyle = "black";
            this.ctx.fillText("OFF",200,325);
            this.ctx.fillStyle = "green";
            this.ctx.fillText("ON", 250, 325);
        }
        else {
            this.ctx.fillStyle = "green";
            this.ctx.fillText("OFF",200,325);
            this.ctx.fillStyle = "black";
            this.ctx.fillText("ON", 250, 325);
        }
       

        this.ctx.drawImage(gameTiles , 724, 93, 110, 41, 200, 500, 110, 41);
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
                    dis.createControls();
                }
                else if(e.offsetX >= 342 && e.offsetX<= 378 && e.offsetY >= 524 && e.offsetY <= 556) {
                    dis.createOptions();
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
            if(gameState == "controls") {
                if(e.offsetX >= 200 && e.offsetX <= 610 && e.offsetY >= 500 && e.offsetY <= 541){
                    console.log("menu");
                    dis.createMainMenu();
                    gameState = "start";
                }
            }
            if(gameState == "options") {
                if(e.offsetX >= 251 && e.offsetX <= 284 && e.offsetY >= 310 && e.offsetY <= 324) {
                    console.log("sound on");
                    sounds = "on";
                    localStorage.setItem("sounds" , "on");
                    dis.createOptions();
                }
                else if (e.offsetX >= 201 && e.offsetX <= 240 && e.offsetY >= 309 && e.offsetY <= 323) {
                    console.log("sound off");
                    sounds = "off";
                    localStorage.setItem("sounds" , "off");
                    dis.createOptions();
                }
                else if(e.offsetX >= 118 && e.offsetX <= 159 && e.offsetY >= 209 && e.offsetY <= 227){
                    console.log("ds off");
                    directionalShooting = "off";
                    localStorage.setItem("directionalShooting", "off");
                    dis.createOptions();
                }
                else if(e.offsetX >= 172 && e.offsetX <= 203 && e.offsetY >= 209 && e.offsetY <= 227){
                    console.log("ds on");
                    directionalShooting = "on";
                    localStorage.setItem("directionalShooting", "on");
                    dis.createOptions();
                }
                else if(e.offsetX >= 200 && e.offsetX <= 610 && e.offsetY >= 500 && e.offsetY <= 541){
                    console.log("menu");
                    dis.createMainMenu();
                    gameState = "start";
                }
            }
            
                     
        });
    }

   
}

loadMedia = 14;
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

doodleRocket = new Image();
doodleRocket.src = "./images/lik-rocket.png";
doodleRocket.addEventListener("load",loadCount,false);

doodleShield = new Image();
doodleShield.src = "./images/circle.png";
doodleShield.addEventListener("load",loadCount,false);


tile = new Image();
tile.src = "./images/tile.png";
tile.addEventListener("load",loadCount,false);

// tileBlue = new Image();
// tileBlue.src = "./images/tile-blue.png";
// tileBlue.addEventListener("load",loadCount,false);

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
