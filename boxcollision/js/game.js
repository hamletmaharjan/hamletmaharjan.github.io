
function Game() {

    this.fieldWidth = 700;
    this.fieldHeight = 400;
    this.balls = [];
    // this.ballCount = 5;
    this.speed = 2;
    // this.radius = 20;
    this.radii = [7,9,10,15,20];
    
    this.colors = ['red','green','blue','orange','black'];
    this.ballPositions = [];
    
    this.init = function(isAntGame, width, height, containerId, ballCount, radius){
        this.isAntGame = isAntGame;
        this.fieldWidth = width || 700;
        this.fieldHeight = height || 400;
        this.ballCount = ballCount || 5;
        this.radius = radius || 20;
        this.size = this.radius*2;
        // this.radius = this.getRandomValue(35,10);
        this.gameField = document.getElementById(containerId);
        this.gameField.style.width = this.fieldWidth + 'px';
        this.gameField.style.height = this.fieldHeight + 'px';
        // this.gameField.style.backgroundColor = 'red';
        console.log(this.gameField);

        // for(var i=0; i<this.ballCount; i++){
            
        // }
        let initialx = this.getRandomValue(this.fieldWidth-this.size,0);
        let initialy = this.getRandomValue(this.fieldHeight-this.size,0);
        this.ballPositions.push({'x':initialx, 'y':initialy});
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
        if(this.isAntGame){
            console.log('yes');
            for (let i=0; i<this.ballCount; i++){
                let ball = new Ant();
                ball.init(this.ballPositions[i].x, this.ballPositions[i].y, this.radius);
                ball.draw(this.gameField);
                
                this.balls.push(ball);
            }

        }
        else{
            console.log('no');
            for (let i=0; i<this.ballCount; i++){
                let ball = new Box();
                ball.init(this.ballPositions[i].x, this.ballPositions[i].y, this.radius, this.colors[this.getRandomValue(5,0)],
                this.getRandomValue(4,1));
                ball.draw(this.gameField);
                this.balls.push(ball);
            }

        }

        
        
        this.update();

    }

    

    this.update = function() {
        let x = setInterval(() => {
            for(let i=0; i<this.balls.length; i++){
                
                this.detectBorderCollision(i);
                this.detectBallCollision(this.balls[i], i);
                this.balls[i].x += this.balls[i].speed * this.balls[i].dirx;
                this.balls[i].y += this.balls[i].speed * this.balls[i].diry;
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

//isAntGame, width, height, containerId, ballCount
var game = new Game();
game.init(false, 800,400, 'container-1',15,20);

var g = new Game();
g.init(true, 600,200, 'container-2');