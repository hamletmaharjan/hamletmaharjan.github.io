

function Player() {
    
    this.width = 50;
    this.height = 100;
    this.index = 1;
    this.lanes = 3;
    this.top = 0;
    this.y = 500;
    this.positions = [25, 125, 225];
    // this.isPlayer = false;

    this.init = function() {
        // this.isPlayer = isPlayer || false;
        this.car = document.createElement('div');
        // this.x = x;
        // this.y = y;
        this.car.style.position = 'absolute';
        this.car.style.width = this.width + 'px';
        this.car.style.height = this.height + 'px';
        this.car.style.backgroundImage = 'url("./images/car-red.png")';
        this.car.style.backgroundSize = 'contain';
        this.car.style.backgroundRepeat = 'no-repeat';
        // if(this.isPlayer){
        this.car.style.left = this.positions[1] + 'px';
        this.x = this.positions[1];
        this.index = 1;
        // }
        // else{
        //     this.car.style.left = this.positions[ind] + 'px';
        // }
        this.car.style.top = this.y + 'px';
        
    }

    this.draw = function(field) {
        field.appendChild(this.car);
    }


    this.toLeft = function() {
        if(this.index <= 0){
            console.log('edge');
        }
        else{
            this.index--;
        }
        this.x = this.positions[this.index];
        this.car.style.left = this.positions[this.index] + 'px';
    }

    this.toRight = function() {
        if(this.index >= this.lanes-1){
            console.log('edge');
        }
        else{
            this.index++;
           
        }
        this.x = this.positions[this.index];
        this.car.style.left = this.positions[this.index] + 'px';
    }


}


function Enemy() {
    this.width = 50;
    this.height = 100;
    this.index = 1;
    this.lanes = 3;
    this.y = 0;
    this.positions = [25, 125, 225];
    this.backgroundImages = ['car-yellow', 'car-green', 'car-blue'];

    this.init = function(ind, y) {
        this.y = y || 0
        this.car = document.createElement('div');
        this.car.style.position = 'absolute';
        this.car.style.width = this.width + 'px';
        this.car.style.height = this.height + 'px';
        let value = this.backgroundImages[this.getRandomValue(2,0)];
        console.log(value);
        // let img = backgroundImages[getRandomValue(2,0)];
        this.car.style.backgroundImage = `url("./images/${value}.png")`;
        this.car.style.backgroundSize = 'contain';
        this.car.style.backgroundRepeat = 'no-repeat'; 
        this.car.style.left = this.positions[ind] + 'px';
        this.x = this.x = this.positions[ind];
        this.car.style.top = this.y + 'px';
        
    }

    this.draw = function(field) {
        field.appendChild(this.car);
    }

    this.update = function() {
        this.car.style.top = this.y + 'px';
    }

    this.destroy = function() {
        this.car.parentElement.removeChild(this.car);
    }

    this.getRandomValue = function(max,min){
        let val = Math.random() * (max - min) + min;
        return Math.round(val);
    }

}




function Game() {
    this.score = 0;
    this.enemies = [];
    this.width = 300;
    this.height = 600;
    var dis = this;
    this.backgroundy = 0;
    this.restart = false;
    
    this.init = function(fieldId) {
        this.highScore = localStorage.getItem("xscore") || 0;
        console.log(this.highScore);
        this.field = document.getElementById(fieldId);
        this.field.style.width = this.width + 'px';
        this.field.style.height = this.height + 'px';
        this.field.style.backgroundColor = 'red';
        this.field.style.backgroundImage = 'url("./images/lane.png")';
        this.field.style.backgroundPositionY = this.backgroundy + 'px';
        // this.field.style.backgroundImage ='url("./images/lane.png") 0 / '+ this.width+'px ' + this.height+ 'px';
        this.player = new Player();
        this.player.init();
        this.player.draw(this.field);
        if(!this.restart) {
            this.addListeners();
        }
        

        // this.createEnemy();
        let temp = [-50,-300,-600];

        for(var i =0; i<3; i++){
            let enemy = new Enemy();
            enemy.init(this.getRandomValue(2,0) , temp[i]);
            enemy.draw(this.field);
            this.enemies.push(enemy);

        }
        this.createScore();

        
        this.createStartScreen();
        // this.update();
        
        
    }

    this.createEnemy = function() {
        
        let enemy = new Enemy();
        enemy.init(this.getRandomValue(2,0), -110);
        enemy.draw(this.field);
        this.enemies.push(enemy);        
    }

    this.createScore = function() {
        this.scoreText = document.createElement('p');
        this.scoreBody = "Your Score: ";
        this.scoreText.innerHTML = this.scoreBody;
        this.scoreText.style.position = 'absolute';
        this.scoreText.style.top = '5px';
        this.scoreText.style.right = '5px';
        this.scoreText.style.color = 'white';
        this.scoreText.style.textShadow = "2px 2px 5px black";

        this.highScoreText = document.createElement('p');
        this.highscoreBody = "High Score: "+ this.highScore;
        this.highScoreText.innerHTML = this.highscoreBody;
        this.highScoreText.style.position = 'absolute';
        this.highScoreText.style.top = '20px';
        this.highScoreText.style.right = '5px';
        this.highScoreText.style.color = 'white';
        this.highScoreText.style.textShadow = "2px 2px 5px black";
        this.field.appendChild(this.scoreText);
        this.field.appendChild(this.highScoreText);
    }

    this.addListeners = function() {
        document.addEventListener('keydown', function(e) {
            switch(e.key){
                case 'a':
                    console.log('left');
                    dis.player.toLeft();
                    break;
                case 'd':
                    console.log('right');
                    dis.player.toRight();
                    break;
                default:
                    console.log('wrong key');
                    break;
            }
            
        });
    }
    this.update = function() {
        this.speed = 1;
        this.gameLoop = setInterval(() => {
            dis.backgroundy += 2 + this.speed;
            dis.field.style.backgroundPositionY=  dis.backgroundy+ 'px';
            for(var i=0; i<this.enemies.length; i++) {
                this.enemies[i].y += 1+ this.speed;
                this.enemies[i].update();
                
                this.detectBallCollision(this.enemies[i]);
                this.detectBorderCollision(this.enemies[i], i);
            }
            // setTimeout(() => {
            //     this.createEnemy();
            // }, 5000);
            this.speed+= 0.001;
            // console.log(this.speed.toFixed(3));
            
        }, 16);
        
    }


    this.getRandomValue = function(max,min){
        let val = Math.random() * (max - min) + min;
        return Math.round(val);
    }

    this.detectBallCollision = function(enemy){
        if (this.player.x <= enemy.x+ enemy.width &&
            this.player.x + this.player.width >= enemy.x &&
            this.player.y <= enemy.y + enemy.height &&
            this.player.y + this.player.height >= enemy.y) {

            console.log('collision');
            clearInterval(dis.gameLoop);
            if(this.score > this.highScore){
                localStorage.setItem('xscore', this.score);
            }
            this.createGameOverScreen();
            this.showGameOverScreen();
        }
    }

    this.detectBorderCollision = function(enemy) {
        // if(enemy.y == this.height-enemy.height){
            
            
        // }      
        if(enemy.y >= this.height){
            console.log('border');
            
            this.enemies.shift();
            enemy.destroy();
            this.score++;
            console.log(this.score);
            this.scoreText.innerHTML = this.scoreBody + this.score;
            this.createEnemy();
        }
    }

    this.createStartScreen = function() {
        this.startScreen = document.createElement('div');
        this.startScreen.style.width = this.width+'px';
        this.startScreen.style.height = this.height+'px';
        // this.startScreen.style.display = 'none';
        this.startScreen.style.textAlign = 'center';
        this.startScreen.style.verticalAlign = 'center';
        this.startScreen.style.backgroundColor = 'blue';
        this.startScreen.style.position = 'absolute';
        this.startScreen.style.lineHeight = this.height + 'px';
        this.startScreen.style.zIndex = '1';
        this.startScreen.style.backgroundImage = 'url("./images/cool-cover.jpg")';
        // this.startScreen.style.backgroundSize = "contain";
        // this.startScreen.style.padding = '20px';
        this.startScreen.innerHTML = 'Click Anywhere to Start';
       
        this.field.appendChild(this.startScreen);
        this.startScreen.addEventListener('click', function(){
            dis.startScreen.style.display = 'none';
            dis.update();
        });
    }

    this.createGameOverScreen = function() {
        this.screen = document.createElement('div');
        this.screen.style.width = this.width+'px';
        this.screen.style.height = this.height+'px';
        this.screen.style.display = 'none';
        this.screen.style.textAlign = 'center';
        this.screen.style.verticalAlign = 'center';
        // this.screen.style.backgroundColor = '#69b578';
        this.screen.style.position = 'absolute';
        this.screen.style.lineHeight = this.height + 'px';
        this.screen.style.zIndex = '1';
        this.screen.style.backgroundImage = 'url("./images/cover-cut.jpg")';
        // this.screen.style.padding = '20px';
        this.screen.innerHTML = 'game over';

       

        var playAgainBtn = document.createElement('Button');
        playAgainBtn.innerHTML = "Play Again?";
        // playAgainBtn.style.background ="black";
        playAgainBtn.style.border = "none";
        playAgainBtn.style.cursor="pointer";
        
        this.screen.appendChild(playAgainBtn);
        playAgainBtn.addEventListener('click', function(){
            dis.hideGameOverScreen();
            dis.resetGame();
            // dis.init('field-1');
        });
        this.field.appendChild(this.screen);
    }
    this.showGameOverScreen = function() {
        this.screen.style.display = 'block';
    }
    this.hideGameOverScreen = function() {
        dis.screen.style.display = 'none';
    }

    this.resetGame = function() {
        
        // for(let i=0; i<this.enemies.length; i++){
        //     this.enemies.pop();
        // }
        while(this.enemies.length!=0){
            this.enemies.pop();
        }
        dis.player = null;
        this.field.innerHTML = '';
        this.field = null;
        this.score = 0;
        this.restart = true;
        
        console.log(this.field);
        this.init('field-1');
    }



}


var g = new Game();
g.init('field-1');