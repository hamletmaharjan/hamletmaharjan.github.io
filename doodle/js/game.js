
function Game(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.width = 400;
    this.height = 657;
    let dis = this;
    this.dy = 2;
    this.vx = 3;
    this.tiles = [];
    this.woodenTiles = [];
    this.goingDown = true;
    this.currentTile = 0;
    this.jumpThreshold = 300;
    this.score = 0;
    this.hasHoles = false;
    this.hasMonsters = false;
    this.reset = false;
    this.hitsCount = 0;
    this.pickupFrequency = 25;
    this.monsterSpawnHeight = 400;


    this.init = function() {
        gameState = "playing";
        this.highScore = localStorage.getItem('doodleHigh') || 0;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        let background = document.getElementById('background');
        this.ctx.drawImage(background,0,0,this.width,this.height);

        this.player = new Player(this.canvas, 40,500);
        this.player.draw();
        this.tile = new Tile(this.canvas, 20,620, this.pickupFrequency);
        this.tile.init();
        this.tiles.push(this.tile);
        this.createTiles(); 
        this.player.addListeners();
        this.update();
    }

    this.drawTopScore = function() {
        this.ctx.drawImage(topScore, 0,0, 320, 38,0,0, this.width, 38);
        this.ctx.font = "24px Comic Sans MS";
        this.ctx.fillStyle = "black";
        this.ctx.fillText(this.score.toFixed(0),20,25);
        this.ctx.drawImage(topScore, 472, 2, 12, 14, this.width-30, 7, 12, 14);
        if(this.score > 0 && this.score.toFixed(0) % 500 == 0) {
            this.hasHoles = true;
            this.hole = new Hole(this.canvas, this.getRandomValue(0, this.width-50), -70);
            this.pickupFrequency+=5;   
        }

        if(this.score > 0 && this.score.toFixed(0) % this.monsterSpawnHeight == 0) {
            this.hasMonsters = true;
            this.score++;
            this.monster = new Monster(this.canvas, this.getRandomValue(0, this.width-158), -50);
            this.monster.init();
            this.counter = 0;
            monsterSound.play();
            console.log(this.monster.choosen);
            if(this.monsterSpawnHeight >= 250) {
                this.monsterSpawnHeight -= 20;
            }
            this.hitsCount++;
        }
    }

    this.createTiles = function() {
        for(let i=5; i>=0; i--){
            let t = new Tile(this.canvas, this.getRandomValue(0,this.width-60), i*100, this.pickupFrequency);
            t.init();
            this.tiles.push(t);
        }

        for(let i=2; i>=-5; i--){
            let t = new WoodenTile(this.canvas, getRandomValue(0, this.width-60), (i*200) + 40);
            this.woodenTiles.push(t);

        }
    }

    this.update = function() {
        dis.reqId = requestAnimationFrame(dis.update);
        dis.ctx.clearRect(0,0, this.width,this.height);
        dis.ctx.drawImage(background,0,0);

        if(dis.hasHoles) {
            dis.hole.draw();
        }
        for(let i=0; i<dis.tiles.length; i++){
            dis.tiles[i].draw();
        }
        for(let i=0; i<dis.woodenTiles.length; i++) {
            dis.woodenTiles[i].update(dis.player);
        }
        for(let i=0; i<dis.woodenTiles.length; i++) {
            if(dis.woodenTiles[i].detectOutOfBorder()) {
                dis.woodenTiles.shift();
            }
        }
        
        dis.player.update(dis.tiles);
        if(dis.player.detectOutOfFrame(dis.height)){
            dis.createGameOverScreen();
            fallingSound.play();
        }
        dis.moveDown();
        if(dis.hasHoles){
            if(dis.player.detectHolesCollision(dis.hole)) {
                dis.createGameOverScreen();
            }
        }
        if(dis.hasMonsters) {
            dis.monster.draw();
            if(dis.monster.detectCollision(dis.player) == "collided"){
                dis.createGameOverScreen();
            }
            else if(dis.monster.detectCollision(dis.player) == "jumped") {
                dis.player.setJumpspeed(-10);
                dis.player.velocity = dis.player.jumpSpeed;
                dis.player.falling = false;
                dis.monster = null;
                dis.hasMonsters = false;
                monsterSound.stop();
                jumpSound.play();
            }
            else if(dis.monster.detectCollision(dis.player) == "shredded") {
                dis.monster = null;
                dis.hasMonsters = false;
                monsterSound.stop();
            }
            if(dis.player.detectBulletCollisionWithMonster(dis.monster)){
                dis.counter++;
                if(dis.counter >= dis.hitsCount) {
                    console.log('enemy die');
                    dis.monster = null;
                    dis.hasMonsters = false;
                    monsterSound.stop();
                } 
            }
        }

        if(dis.hasMonsters) {
            if(dis.monster.detectOutOfFrame()) {
                monsterSound.stop();
            }
        }
        
        dis.drawTopScore();

        // console.log(dis.tiles.length);
        // dis.detectOutOfFrame();


        // setInterval(() => {
        //     dis.ctx.clearRect(0,0, this.width,this.height);
        //     dis.ctx.drawImage(background,0,0);

        //     for(let i=0; i<dis.tiles.length; i++){
        //         dis.tiles[i].draw();
        //     }


        //     // dis.player.y += dis.dy;
        //     // dis.player.draw();

            
        //     dis.player.update(dis.tiles);
        // }, 50);
    }

    this.moveDown = function() {
        if(this.player.y <= this.jumpThreshold) {
            diff = this.jumpThreshold- this.player.y;
            if(this.hasHoles) {
                if(this.player.velocity<= 0 ){
                    this.hole.y -= this.player.velocity;
                }
            }
            if(this.hasMonsters) {
                if(this.player.velocity<= 0 ){
                    this.monster.y -= this.player.velocity;
                }
            }
            for(let i=0; i<this.woodenTiles.length; i++) {
                if(this.player.velocity<= 0 ){
                    this.woodenTiles[i].y -= this.player.velocity;
                }
            }
            
            for(let i=0; i<this.tiles.length; i++) {
                if(this.player.velocity<= 0 ){
                    this.tiles[i].y -= this.player.velocity;
                }
                this.score += 0.1;
                if(this.tiles[i].y > this.height){
                    this.tiles.splice(i,1);
                    let t = new Tile(this.canvas, this.getRandomValue(0,this.width-60), -50, this.pickupFrequency);
                    t.init();
                    this.tiles.push(t);
                }
            }
        }
    }

    this.createGameOverScreen = function() {
        gameState = "gameover";
        cancelAnimationFrame(this.reqId);
        // this.ctx.drawImage(background,0,0,this.width,this.height);
        this.ctx.font = "24px Comic Sans MS";
        this.ctx.fillStyle = "black";
        if(parseInt(this.score)> this.highScore) {
            this.highScore = parseInt(this.score);
            localStorage.setItem('doodleHigh', this.highScore);
        }
        this.ctx.fillText("game Over",100,250);
        this.ctx.fillText("Your Score: "+ this.score.toFixed(0), 100, 300);
        this.ctx.fillText("Best Score: "+ this.highScore, 100, 350);

        this.ctx.drawImage(gameTiles , 724, 48, 110, 41, 150, 450, 110, 41);
        this.ctx.drawImage(gameTiles , 724, 93, 110, 41, 150, 520, 110, 41);

        window.removeEventListener("mousedown", this.player.clickListener);
        propellerSound.stop();
        jetpackSound.stop();
        monsterSound.stop();
    }

    this.createPauseScreen = function() {
        cancelAnimationFrame(this.reqId);
        rocketSound.pause();
        propellerSound.pause();
        jetpackSound.pause(); 
        monsterSound.pause();
       
        this.ctx.drawImage(background,0,0,this.width,this.height);
        this.ctx.drawImage(topScore, 0,0, 320, 38,0,0, this.width, 38);
        this.ctx.font = "24px Comic Sans MS";
        this.ctx.fillStyle = "black";
        // this.ctx.textAlign = "center";
        this.ctx.fillText(this.score.toFixed(0),20,25);
        this.ctx.fillText("Paused",(this.width/2)-50,this.height/2);

        this.ctx.drawImage(gameTiles , 724, 0, 110, 41, 200, 500, 110, 41);    
    }

    this.resetGame = function() {
        this.player = null;
        this.tile = null;
        this.score = 0;
        this.hasHoles = false;
        this.hasMonsters = false;
        this.reset = true;
        this.goingDown = true;
        this.tiles = [];
        this.hitsCount = 0;
        this.woodenTiles = [];
        this.init();
    }
   
    this.getRandomValue = function(max,min){
        let val = Math.random() * (max - min) + min;
        return Math.round(val);
    }
}


