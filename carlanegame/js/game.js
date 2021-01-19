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
        this.car.style.left = this.positions[this.index] + 'px';
        this.x = this.positions[this.index];
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

    this.init = function(ind, y) {
        this.y = y || 0
        this.car = document.createElement('div');
        this.car.style.position = 'absolute';
        this.car.style.width = this.width + 'px';
        this.car.style.height = this.height + 'px';
        this.car.style.backgroundImage = 'url("./images/car-yellow.png")';
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

}




function Game() {
    this.score = 0;
    this.enemies = [];
    this.width = 300;
    this.height = 600;
    var dis = this;
    this.backgroundy = 0;
    this.init = function(fieldId) {
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
        this.addListeners();

        // this.createEnemy();
        let temp = [-50,-150,-400];

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
        enemy.init(this.getRandomValue(2,0), -55);
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
        this.scoreText.style.color = 'green';
        this.field.appendChild(this.scoreText);
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
        this.screen.style.backgroundColor = 'blue';
        this.screen.style.position = 'absolute';
        this.screen.style.lineHeight = this.height + 'px';
        this.screen.style.zIndex = '1';
        // this.screen.style.padding = '20px';
        this.screen.innerHTML = 'game over';

        var playAgainBtn = document.createElement('Button');
        playAgainBtn.innerHTML = "Play Again?";
        playAgainBtn.style.background ="white";
        playAgainBtn.style.border = "none";
        playAgainBtn.style.cursor="pointer";
       
        this.screen.appendChild(playAgainBtn);
        playAgainBtn.addEventListener('click', function(){
            dis.hideGameOverScreen();
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



}


var g = new Game();
g.init('field-1');