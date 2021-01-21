

function Game() {
    this.width = 288;
    this.height = 512;
    this.bp = 0;
    this.gap = 120;
    this.groundHeight = 112;
    this.obsitcles = [];
    this.checkTop = false;
    this.score = 0;
    this.fallSpeed = 0.8;
    this.fallRate = 1.05;
    this.restart = false;
    this.forwardSpeed = 2;
    this.jumpHeight = 40;

    this.init = function() {
        this.highScore = localStorage.getItem('flappyhigh') || 0;
        this.field = document.getElementById('field-1');
        this.field.style.width = this.width + 'px';
        this.field.style.height = this.height + 'px';
        


        this.lane = document.createElement('div');
        this.lane.style.position = 'absolute';
        this.lane.style.width = this.width + 'px';
        this.lane.style.height = '112px';
        this.lane.style.left = '0px';
        this.lane.style.bottom = '0px';
       
        this.lane.style.backgroundImage = 'url("./images/base.png")';
        this.lane.style.backgroundRepeat = 'repeat-x';
        this.lane.style.backgroundPosition = 'bottom';
        this.lane.style.backgroundPositionX = this.bp + 'px';
        this.lane.style.zIndex = '2';

        this.field.appendChild(this.lane);

        this.player = new Bird();
        this.player.init();
        this.player.draw(this.field);


        //listeners removed from here

        this.player.animate();
        this.createScore();

        this.createStartScreen();
    
        
    }

    this.createScore = function() {
        this.scoreText = document.createElement('p');
        this.scoreText.style.position = 'absolute';
        this.scoreText.classList.add('score-text');
        this.scoreText.innerHTML = this.score;

        this.field.appendChild(this.scoreText);
    }

    this.createStartScreen = function() {
        let dis = this;
        this.startScreen = document.createElement('div');
        this.startScreen.style.position = 'absolute';
        this.startScreen.style.width = '184px';
        this.startScreen.style.height = '267px';
        this.startScreen.classList.add('start-screen');
        this.startScreen.style.left = '60px';
        this.field.appendChild(this.startScreen);

        this.startScreen.addEventListener('click', function() {
            dis.startScreen.style.display = 'none';
            dis.createInitialObsticles();
            if(!dis.restart) {
                dis.addListeners();
            }
            dis.update();
        });
    }


    this.createGameOverScreen = function() {
        this.overScreen = document.createElement('div');
        this.overScreen.style.width = '192px';
        this.overScreen.style.height = '267px';
        this.overScreen.style.position = 'absolute';
        this.overScreen.style.left = '60px';
        this.overScreen.classList.add('over-screen');


        this.yourScore = document.createElement('p');
        this.yourScore.innerHTML = "Score : " + this.score;
        this.yourScore.classList.add('your-score');
        this.overScreen.append(this.yourScore);

        this.bestScore = document.createElement('p');
        this.bestScore.innerHTML = "Best : " + this.highScore;
        this.bestScore.classList.add('best-score');
        this.overScreen.append(this.bestScore);

        this.playButton = document.createElement('div');
        this.playButton.style.width = "150px";
        this.playButton.style.height = "85px";
        this.playButton.classList.add('play-button');
        this.overScreen.appendChild(this.playButton);

        let dis = this;

        this.playButton.addEventListener('click', function() {
            
            dis.overScreen.style.display = 'none';
            dis.resetGame();

        });

        this.field.appendChild(this.overScreen);
       
    }


    this.resetGame = function() {
        while(this.obsitcles.length!=0){
            this.obsitcles.pop();
        }
        this.player = null;
        this.field.innerHTML = '';
        this.field = null;
        this.score = 0;
        this.restart = true;
        this.init();
        
    }

    this.createInitialObsticles = function() {

        let obsitcle = new Obsticle();
        let temp = this.getRandomValue(350,150);
        obsitcle.init(false,this.width, temp);
        obsitcle.draw(this.field);

        let ob = new Obsticle();
        ob.init(true, this.width, temp-this.gap-320);
        ob.draw(this.field);

        this.obsitcles.push(obsitcle);
        this.obsitcles.push(ob);

        let obsitcle2 = new Obsticle();
        let temp2 = this.getRandomValue(350,150);
        obsitcle2.init(false,this.width+ 170, temp2);
        obsitcle2.draw(this.field);

        let ob2 = new Obsticle();
        ob2.init(true, this.width+170, temp2-this.gap-320);
        ob2.draw(this.field);

        this.obsitcles.push(obsitcle2);
        this.obsitcles.push(ob2);

    }

    this.createNewObsitcle = function() {
        this.score += 1;
        this.scoreText.innerHTML = this.score;
        
        let obsitcle = new Obsticle();
        let temp = this.getRandomValue(350,150);
        obsitcle.init(false,this.width, temp);
        obsitcle.draw(this.field);

        let ob = new Obsticle();
        ob.init(true, this.width, temp-this.gap-320);
        ob.draw(this.field);

        this.obsitcles.push(obsitcle);
        this.obsitcles.push(ob);
    }

    this.addListeners = function() {
        let dis = this;
        this.field.addEventListener('click', function(e) {
            dis.player.y -= dis.jumpHeight;
            dis.fallSpeed = 0.5;
            dis.player.update();
        });

       
    }

    this.update = function() {
        let dis = this;
        this.gameLoop = setInterval(() => {
            this.player.y += this.fallSpeed;
            this.fallSpeed *= this.fallRate;
            this.player.update();
            this.bp -= this.forwardSpeed;
            this.lane.style.backgroundPositionX = this.bp + 'px';

            for (let i=0; i<this.obsitcles.length; i++){
                dis.obsitcles[i].x -= this.forwardSpeed;
                dis.obsitcles[i].update();
                this.detectBirdCollision(this.obsitcles[i]);
                this.detectOutOfFrame(this.obsitcles[i]);
            }

            this.detectBorderCollision();
            
            
        }, 16); 
    }

    

    this.detectOutOfFrame = function(pipe) {
        if(pipe.x <= 0-pipe.width){
            pipe.destory();
            
            if(pipe.top){
                if (this.obsitcles.length < 4)
                    this.createNewObsitcle();
                setTimeout(() => {
                    this.obsitcles.shift();                    
                }, 10);
            }
        }
    }

    this.detectBorderCollision = function() {
        if(this.player.y >= (this.height-this.groundHeight- this.player.height) || this.player.y <=0){
            
            clearInterval(this.gameLoop);
            this.player.stopAnimation();

            this.createGameOverScreen();
        }      
    }

    this.detectBirdCollision = function(enemy) {
        
        if (this.player.x <= enemy.x+ enemy.width &&
            this.player.x + this.player.width >= enemy.x &&
            this.player.y <= enemy.y + enemy.height &&
            this.player.y + this.player.height >= enemy.y) {
            
            clearInterval(this.gameLoop);
            this.player.stopAnimation();

            if(this.score > this.highScore){
                localStorage.setItem('flappyhigh', this.score);
                this.highScore = this.score;
            }
            this.createGameOverScreen();
            
        }
        
    }
    this.getRandomValue = function(max,min){
        let val = Math.random() * (max - min) + min;
        return Math.round(val);
    }
}

var game = new Game();
game.init();