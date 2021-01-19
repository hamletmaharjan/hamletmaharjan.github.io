
function Game() {
    this.balls = [];
    this.speed = 2;
    
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
        
        this.gameField = document.getElementById(containerId);
        this.gameField.style.width = this.fieldWidth + 'px';
        this.gameField.style.height = this.fieldHeight + 'px';
        
        let initialx = this.getRandomValue(this.fieldWidth-this.size,0);
        let initialy = this.getRandomValue(this.fieldHeight-this.size,0);
        this.ballPositions.push({'x':initialx, 'y':initialy});
        
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
              
        }
    
        if(this.isAntGame) {
            for (let i=0; i<this.ballCount; i++) {
                let ball = new Ant();
                ball.init(this.ballPositions[i].x, this.ballPositions[i].y, this.radius);
                ball.draw(this.gameField);
                this.balls.push(ball);
            }

        }
        else {
            for (let i=0; i<this.ballCount; i++) {
                let ball = new Box();
                ball.init(this.ballPositions[i].x, this.ballPositions[i].y, this.radius, this.colors[this.getRandomValue(5,0)],
                this.getRandomValue(2,0.5));
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
            }
        }, 16.67);
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
        for (var i=0; i<this.balls.length; i++){
            if(i==ind){
                continue;
            }
            
            if (b.x <= this.balls[i].x+ this.balls[i].width &&
                b.x + b.width >= this.balls[i].x &&
                b.y <= this.balls[i].y + this.balls[i].height &&
                b.y + b.height >= this.balls[i].y) {

                if (Math.abs(b.x - this.balls[i].x) > Math.abs(b.y - this.balls[i].y)){
                    this.balls[ind].dirx *= -1;
                    
                }
                else {
                    this.balls[ind].diry *= -1;
                   
                }
            }
            
        }
    }

    this.getRandomValue = function(max,min){
        let val = Math.random() * (max - min) + min;
        return Math.round(val);
    }
}
