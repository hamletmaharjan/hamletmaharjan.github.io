function Box() {
    this.init = function(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.dirx = 1;
        this.diry = 1;
        this.width = width || 20;
        this.height = height || 20;
        this.box = document.createElement('div');
        this.box.style.width = this.width + 'px';
        this.box.style.height = this.height + 'px';
        this.box.style.position = 'absolute';
        this.box.style.left = this.x + 'px';
        this.box.style.top = this.y + 'px';
        this.box.style.backgroundColor = 'red';
        // this.box.style.borderRadius = '50%';
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
    this.ballCount = 3;
    this.speed = 2;
    this.dirx = [];
    this.diry = [];
    this.size = 80;
    // this.ballPositions = [
    //     {x:10, y:20},
    //     {x:40, y:40},
    //     {x:60, y:20},
    //     {x:70, y:30},
    //     {x:100, y:300}
    // ];
    this.ballPositions = [];
    this.init = function(){
        this.gameField = document.getElementById('root');
        this.gameField.style.width = this.fieldWidth + 'px';
        this.gameField.style.height = this.fieldHeight + 'px';
        // this.gameField.style.backgroundColor = 'red';
        console.log(this.gameField);

        for(var i=0; i<this.ballCount; i++){
            x = this.getRandomValue(this.fieldWidth-this.size,0);
            y = this.getRandomValue(this.fieldHeight-this.size,0);
            this.ballPositions.push({'x':x, 'y':y});
            this.dirx.push(1);
            this.diry.push(1);
        }
        console.log(this.ballPositions, this.dirx);

        for (var i=0; i<this.ballCount; i++){
            var ball = new Box();
            ball.init(this.ballPositions[i].x, this.ballPositions[i].y, 80, 80);
            ball.draw(this.gameField);
            this.balls.push(ball);
        }
        // this.ball = new Box();
        // this.ball.init(10, this.size);
        // this.ball.draw(this.gameField);
        this.update();

    }

    this.update = function() {
        let x = setInterval(() => {
            for(let i=0; i<this.balls.length; i++){
                this.balls[i].x += this.speed * this.dirx[i];
                this.balls[i].y += this.speed * this.diry[i];
                this.balls[i].move();
                this.detectBorderCollision(i);
                // this.detectBallCollision(this.balls[i], i);
                // console.log('s');
            }

            
        }, 50);
    }

    this.detectBorderCollision = function(ind) {
        if(this.balls[ind].x >= this.fieldWidth-this.size || this.balls[ind].x <=0){
            this.dirx[ind] *= -1;
        }
        if(this.balls[ind].y >= this.fieldHeight-this.size || this.balls[ind].y <=0){
            this.diry[ind] *= -1;
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
            if(b.x < this.balls[i].x+ this.size &&
                b.x + this.size > this.balls[i].x &&
                b.y < this.balls[i].y + this.size &&
                b.y + this.size >this.balls[i].y
            ){
                console.log('collisi');
                // this.dirx[ind] *= -1;
                // this.diry[ind] *= -1;
            }
            // if(this.balls[i].x > b.x  && this.balls[i].x < b.x+this.size && this.balls[i].y > b.y && this.balls[i].y < b.y+20){
            //     console.log('collison');
            //     this.dirx[ind] *= -1;
            //     this.diry[ind] *= -1;
            // }
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