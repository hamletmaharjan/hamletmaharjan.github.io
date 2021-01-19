function Player() {
    
    this.width = 50;
    this.height = 100;
    this.index = 1;
    this.lanes = 3;
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
    this.init = function(fieldId) {
        this.field = document.getElementById(fieldId);
        this.field.style.width = this.width + 'px';
        this.field.style.height = this.height + 'px';
        this.field.style.backgroundColor = 'red';

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

        this.update();
        
        
    }

    this.createEnemy = function() {
        
        let enemy = new Enemy();
        enemy.init(this.getRandomValue(2,0), -55);
        enemy.draw(this.field);
        this.enemies.push(enemy);        
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

        this.gameLoop = setInterval(() => {
            // dis.field.style.backgroundPosition = '0px + 2px';
            for(var i=0; i<this.enemies.length; i++) {
                this.enemies[i].y += 5;
                this.enemies[i].update();
                
                this.detectBallCollision(this.enemies[i]);
                this.detectBorderCollision(this.enemies[i], i);
            }
            // setTimeout(() => {
            //     this.createEnemy();
            // }, 5000);
            
        }, 100);
        
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
        }
    }

    this.detectBorderCollision = function(enemy) {
        if(enemy.y >= this.height-enemy.height){
            console.log('border');
            this.enemies.shift();
            enemy.destroy();
            this.score++;
            console.log(this.score);
            this.createEnemy();
        }      
    }



}


var g = new Game();
g.init('field-1');