
function Bird() {
    
    this.width = 34;
    this.height = 24;
    this.x = 72;
    this.y = 232;
    this.index = 0;
    var dis = this;
    this.images = ['redbird-downflap', 'redbird-midflap', 'redbird-upflap', 'redbird-midflap'];
    this.init = function() {
        this.bird = document.createElement('div');
        this.bird.style.width = this.width + 'px';
        this.bird.style.height = this.height + 'px';
        this.bird.style.backgroundImage = 'url("./images/redbird-midflap.png")';
        // this.bird.style.backgroundColor = 'red';
        this.bird.style.position = 'absolute';
        this.bird.style.left = this.x + 'px';
        this.bird.style.top = this.y + 'px';
    }


    this.draw = function(field){
        field.appendChild(this.bird);
    }

    this.update = function() {
        this.bird.style.top = this.y + 'px';
    }

    this.fly = function() {
        this.y -= 15;
        this.bird.style.top = this.y + 'px';
    }

    this.animate = function() {
        
        this.animationLoop = setInterval(() => {
            if(this.index>=4){
                this.index = 0;
            }
            let image = this.images[this.index];
            this.bird.style.backgroundImage = `url("./images/${image}.png`;
            this.index++;
        }, 100);
    }

    this.stopAnimation = function() {
        clearInterval(dis.animationLoop);
    }

    this.animateWings = function() {
        if(this.index>=3){
            this.index = 0;
        }
        let image = this.images[index];
        this.bird.style.backgroundImage = `url("./images/${image}.png`;
        this.index++;
    }
}


function Pipe() {
    this.x = 200;
    this.y = 350;
    this.width = 52;
    this.height = 100;
    
    //y range range -320 to 0
    this.init = function() {
        this.pipeTop = document.createElement('div');
        this.pipeTop.style.position = 'absolute';
        this.pipeTop.style.width = this.width + 'px';
        this.pipeTop.style.height = this.height + 'px';
        this.pipeTop.style.left = this.x + 'px';
        this.pipeTop.style.top = this.y + 'px';
        this.pipeTop.style.backgroundColor = 'red';

    }

    this.draw = function(field) {
        field.appendChild(this.pipeTop);
    }

    this.update = function() {
        this.pipeTop.style.left = this.x + 'px';
    }

    this.getRandomValue = function(max,min){
        let val = Math.random() * (max - min) + min;
        return Math.round(val);
    }

    this.moveLeft = function() {
        setInterval(() => {
            this.x -= 5;
            this.pipeTop.style.left = this.x + 'px';
        }, 50);
    }

    
}


function Obsticle() {
    this.x = 250;
    this.y = 350;

    this.left = 238;
    this.width = 52;
    this.height = 320;
    
    //y range range -320 to 0
    this.init = function(top, x, y) {
        this.top = top || false;
        this.x = x || 250;
        this.y = y || 350;
        this.pipe = document.createElement('div');
        this.pipe.style.position = 'absolute';
        this.pipe.style.width = this.width + 'px';
        this.pipe.style.height = this.height + 'px';
        // this.bottom = Math.random() * 112;
        this.pipe.style.left = this.left + 'px';
        this.pipe.style.top = this.y + 'px';
        this.pipe.style.zIndex = "-1";
        
        // this.pipe.style.backgroundColor = 'red';
        if(this.top){
            this.pipe.style.backgroundImage = 'url("./images/pipe-green-top.png")';
        }
        else{
            this.pipe.style.backgroundImage = 'url("./images/pipe-green.png")';
        }
        

    }

    this.draw = function(field) {
        field.appendChild(this.pipe);
    }

    this.update = function() {
        this.pipe.style.left = this.x + 'px';
    }

    this.destory = function() {
        // this.x = 300;
                // this.pipe.style.left = '500px';
        // this.pipe.parentElement.removeChild(this.pipe);
        this.pipe.remove()
    }

    this.moveLeft = function() {
        setInterval(() => {
            this.x -= 5;
            this.pipeTop.style.left = this.x + 'px';
        }, 50);
    }

    this.getRandomValue = function(max,min){
        let val = Math.random() * (max - min) + min;
        return Math.round(val);
    }

    
}




function Game() {
    this.width = 288;
    this.height = 512;
    this.bp = 0;
    this.gap = 120;
    this.groundHeight = 112;
    this.obsitcles = [];
    this.checkTop = false;
    this.score = 0;

    this.init = function() {
        this.highScore = localStorage.getItem('flappyhigh') || 0;
        this.field = document.getElementById('field-1');
        this.field.style.width = this.width + 'px';
        this.field.style.height = this.height + 'px';
        this.field.style.backgroundImage = 'url("./images/base.png")';
        this.field.style.backgroundRepeat = 'repeat-x';
        this.field.style.backgroundPosition = 'bottom';
        this.field.style.backgroundPositionX = this.bp + 'px';
        this.field.style.zIndex = "0";

        // this.field.style.backgroundColor = 'green';

        this.player = new Bird();
        this.player.init();
        this.player.draw(this.field);

        // this.createInitialObsticles();
        // console.log(this.obsitcles);

        this.addListeners();
        this.player.animate();
        this.createScore();

        this.createStartScreen();
        // this.createGameOverScreen();
       
        // this.update();
        
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
            dis.update();
        });
    }


    this.createGameOverScreen = function() {
        this.overScreen = document.createElement('div');
        this.overScreen.style.width = '192px';
        this.overScreen.style.height = '267px';
        // this.overScreen.style.backgroundColor = 'red';
        this.overScreen.style.position = 'absolute';
        this.overScreen.style.left = '60px';
        // this.overScreen.style.top = '100px';
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

        this.field.appendChild(this.overScreen);
        // this.
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
        document.addEventListener('click', function(e){
            dis.player.y -= 30;
            dis.player.update();
            console.log('click');
        });
    }

    this.update = function() {
        let dis = this;
        this.gameLoop = setInterval(() => {
            this.player.y += 3;
            this.player.update();
            this.bp -= 3;
            this.field.style.backgroundPositionX = this.bp + 'px';

            for (let i=0; i<this.obsitcles.length; i++){
                dis.obsitcles[i].x -= 3;
                dis.obsitcles[i].update();
                this.detectBirdCollision(this.obsitcles[i]);
                this.detectOutOfFrame(this.obsitcles[i]);
            }

            this.detectBorderCollision();
            
            // this.pip.x -= 2;
            // this.pip.update();
        }, 50); 
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
            console.log('border collision');
            clearInterval(this.gameLoop);
            this.player.stopAnimation();

            console.log(this.obsitcles);
        }      
    }

    this.detectBirdCollision = function(enemy) {
        
        if (this.player.x <= enemy.x+ enemy.width &&
            this.player.x + this.player.width >= enemy.x &&
            this.player.y <= enemy.y + enemy.height &&
            this.player.y + this.player.height >= enemy.y) {
            console.log('collision');
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