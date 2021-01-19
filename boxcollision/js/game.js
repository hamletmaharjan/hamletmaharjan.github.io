function Box() {
    this.init = function(x,y,radius,color) {
        this.x = x;
        this.y = y;
        this.dirx = 1;
        this.diry = 1;
        this.radius = radius;
        this.color = color || 'red';
        this.width =  this.radius * 2;
        this.height = this.radius * 2;
        this.box = document.createElement('div');
        this.box.style.width = this.width + 'px';
        this.box.style.height = this.height + 'px';
        this.box.style.position = 'absolute';
        this.box.style.left = this.x + 'px';
        this.box.style.top = this.y + 'px';
        this.box.style.backgroundColor = this.color;
        this.box.style.borderRadius = this.radius +'px';
    }
    this.draw = function(gameField) {
        gameField.appendChild(this.box);
    }

    this.move = function(){
        this.box.style.left = this.x + 'px';
        this.box.style.top = this.y + 'px';
    }
}

function Game() {

    this.fieldWidth = 600;
    this.fieldHeight = 500;
    this.balls = [];
    this.ballCount = 5;
    this.speed = 2;
    this.radius = 20;
    this.radii = [7,9,10,15,20];
    this.size = this.radius*2;
    this.colors = ['red','green','blue','orange','black'];
    this.ballPositions = [];
    this.init = function(){
        // this.radius = this.getRandomValue(35,10);
        this.gameField = document.getElementById('container-1');
        this.gameField.style.width = this.fieldWidth + 'px';
        this.gameField.style.height = this.fieldHeight + 'px';
        // this.gameField.style.backgroundColor = 'red';
        console.log(this.gameField);

        // for(var i=0; i<this.ballCount; i++){
            
        // }
        this.ballPositions.push({'x':10, 'y':15});
        // let i=0;
        while(this.ballPositions.length != this.ballCount){
            let counter = 0;
            let x = this.getRandomValue(this.fieldWidth-this.size,0);
            let y = this.getRandomValue(this.fieldHeight-this.size,0);
           
            for(var i=0; i<this.ballPositions.length; i++){
                if (x <= this.ballPositions[i].x+ this.radius*2 &&
                    x + this.radius*2 >= this.ballPositions[i].x &&
                    y <= this.ballPositions[i].y + this.radius*2 &&
                    y + this.radius*2 >= this.ballPositions[i].y) {
                        counter++;
                    
                }
            }
            if(counter ==0){
                this.ballPositions.push({'x':x, 'y':y});
            }
            counter = 0;
            console.log('ccc');
            
            
        }
        // console.log(this.ballPositions, this.dirx);

        for (var i=0; i<this.ballCount; i++){
            var ball = new Box();
            ball.init(this.ballPositions[i].x, this.ballPositions[i].y, this.radius, this.colors[this.getRandomValue(5,0)]);
            ball.draw(this.gameField);
            this.balls.push(ball);
        }
        
        this.update();

    }

    

    this.update = function() {
        let x = setInterval(() => {
            for(let i=0; i<this.balls.length; i++){
                
                this.detectBorderCollision(i);
                this.detectBallCollision(this.balls[i], i);
                this.balls[i].x += this.speed * this.balls[i].dirx;
                this.balls[i].y += this.speed * this.balls[i].diry;
                this.balls[i].move();
                // console.log('s');
            }

            
        }, 50);
    }

    this.detectBorderCollision = function(ind) {
        if(this.balls[ind].x >= this.fieldWidth-this.balls[ind].width || this.balls[ind].x <=0){
            this.balls[ind].dirx *= -1;
        }
        if(this.balls[ind].y >= this.fieldHeight-this.balls[ind].height || this.balls[ind].y <=0){
            this.balls[ind].diry *= -1;
        }
        
    }

    this.detectBallCollision = function(b,ind){
        // console.log(b);
        for (var i=0; i<this.balls.length; i++){
            if(i==ind){
                continue;
            }
            // if (rect1.x < rect2.x + rect2.width &&
            //     rect1.x + rect1.width > rect2.x &&
            //     rect1.y < rect2.y + rect2.height &&
            //     rect1.y + rect1.height > rect2.y) {
            if (b.x <= this.balls[i].x+ this.balls[i].width &&
                b.x + b.width >= this.balls[i].x &&
                b.y <= this.balls[i].y + this.balls[i].height &&
                b.y + b.height >= this.balls[i].y) {

                if (Math.abs(b.x - this.balls[i].x) > Math.abs(b.y - this.balls[i].y)){
                    this.balls[ind].dirx *= -1;
                    
                }
                else {
                    this.balls[ind].diry *= -1;
                    // that.boxCollided = true;
                }


                
            }
            
        }
    }

    this.getRandomValue = function(max,min){
        let val = Math.random() * (max - min) + min;
        return Math.round(val);
    }
}
// console.log(Math.random());
var game = new Game();
game.init();





function Ant() {
    this.init = function(x,y,radius,color) {
        this.x = x;
        this.y = y;
        this.dirx = 1;
        this.diry = 1;
        this.radius = radius;
        this.color = color || 'red';
        this.width =  this.radius * 2;
        this.height = this.radius * 2;
        this.box = document.createElement('div');
        this.box.style.width = this.width + 'px';
        this.box.style.height = this.height + 'px';
        this.box.style.position = 'absolute';
        this.box.style.left = this.x + 'px';
        this.box.style.top = this.y + 'px';
        this.box.style.backgroundImage = 'url("./images/annt.gif")';
        this.box.style.backgroundSize = this.width + 'px ' + this.height + 'px';
        this.box.classList.add('ant');
        // this.box.style.backgroundColor = this.color;
        // this.box.style.borderRadius = this.radius +'px';
    }
    this.draw = function(gameField) {
        gameField.appendChild(this.box);
        let dis = this;
        this.box.addEventListener('click',function(){
            console.log('clik');
            dis.box.parentElement.removeChild(dis.box);
        });
    }

    this.move = function(){
        this.box.style.left = this.x + 'px';
        this.box.style.top = this.y + 'px';
    }
}

function AntGame() {

    this.fieldWidth = 600;
    this.fieldHeight = 200;
    this.balls = [];
    this.ballCount = 5;
    this.speed = 2;
    this.radius = 20;
    this.radii = [7,9,10,15,20];
    this.size = this.radius*2;
    this.colors = ['red','green','blue','orange','black'];
    this.ballPositions = [];
    this.init = function(){
        // this.radius = this.getRandomValue(35,10);
        this.gameField = document.getElementById('container-2');
        this.gameField.style.width = this.fieldWidth + 'px';
        this.gameField.style.height = this.fieldHeight + 'px';
        // this.gameField.style.backgroundColor = 'red';
        console.log(this.gameField);

        // for(var i=0; i<this.ballCount; i++){
            
        // }
        this.ballPositions.push({'x':10, 'y':15});
        // let i=0;
        while(this.ballPositions.length != this.ballCount){
            let counter = 0;
            let x = this.getRandomValue(this.fieldWidth-this.size,0);
            let y = this.getRandomValue(this.fieldHeight-this.size,0);
           
            for(var i=0; i<this.ballPositions.length; i++){
                if (x <= this.ballPositions[i].x+ this.radius*2 &&
                    x + this.radius*2 >= this.ballPositions[i].x &&
                    y <= this.ballPositions[i].y + this.radius*2 &&
                    y + this.radius*2 >= this.ballPositions[i].y) {
                        counter++;
                    
                }
            }
            if(counter ==0){
                this.ballPositions.push({'x':x, 'y':y});
            }
            counter = 0;
            console.log('ccc');
            
            
        }
        // console.log(this.ballPositions, this.dirx);

        for (let i=0; i<this.ballCount; i++){
            var ball = new Ant();
            ball.init(this.ballPositions[i].x, this.ballPositions[i].y, this.radius, this.colors[this.getRandomValue(5,0)]);
            ball.draw(this.gameField);
            
            this.balls.push(ball);
        }

        
        
        this.update();

    }

    

    this.update = function() {
        let x = setInterval(() => {
            for(let i=0; i<this.balls.length; i++){
                
                this.detectBorderCollision(i);
                this.detectBallCollision(this.balls[i], i);
                this.balls[i].x += this.speed * this.balls[i].dirx;
                this.balls[i].y += this.speed * this.balls[i].diry;
                this.balls[i].move();
                // console.log('s');
            }

            
        }, 50);
    }

    this.detectBorderCollision = function(ind) {
        if(this.balls[ind].x >= this.fieldWidth-this.balls[ind].width || this.balls[ind].x <=0){
            this.balls[ind].dirx *= -1;
        }
        if(this.balls[ind].y >= this.fieldHeight-this.balls[ind].height || this.balls[ind].y <=0){
            this.balls[ind].diry *= -1;
        }
        
    }

    this.detectBallCollision = function(b,ind){
        // console.log(b);
        for (var i=0; i<this.balls.length; i++){
            if(i==ind){
                continue;
            }
            // if (rect1.x < rect2.x + rect2.width &&
            //     rect1.x + rect1.width > rect2.x &&
            //     rect1.y < rect2.y + rect2.height &&
            //     rect1.y + rect1.height > rect2.y) {
            if (b.x <= this.balls[i].x+ this.balls[i].width &&
                b.x + b.width >= this.balls[i].x &&
                b.y <= this.balls[i].y + this.balls[i].height &&
                b.y + b.height >= this.balls[i].y) {

                if (Math.abs(b.x - this.balls[i].x) > Math.abs(b.y - this.balls[i].y)){
                    this.balls[ind].dirx *= -1;
                    
                }
                else {
                    this.balls[ind].diry *= -1;
                    // that.boxCollided = true;
                }


                
            }
            
        }
    }

    this.getRandomValue = function(max,min){
        let val = Math.random() * (max - min) + min;
        return Math.round(val);
    }
}
// console.log(Math.random());
var g = new AntGame();
g.init();