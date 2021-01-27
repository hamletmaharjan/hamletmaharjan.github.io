

function Game(canvas) {
    this.canvas = canvas;
    // this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.width = 400;
    this.height = 657;
    var dis = this;
    this.dy = 2;
    this.vx = 3;
    this.tiles = [];
    this.goingDown = true;


    this.currentTile = 0;

    this.jumpThreshold = 300;
    this.score = 0;

    this.hasHoles = false;
    this.hasMonsters = false;

    this.init = function() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        var background = document.getElementById('background');
        this.ctx.drawImage(background,0,0,this.width,this.height);


        this.player = new Player(this.canvas, 40,500,60,60);
        this.player.draw();

        this.tile = new Tile(this.canvas, 20,620);
        this.tile.init();
        this.tiles.push(this.tile);

        this.createTiles();
        // this.addListeners();

        
       

        this.player.addListeners();
        this.update();
    }

    this.drawTopScore = function() {
        this.ctx.drawImage(topScore, 0,0, 320, 38,0,0, this.width, 38);
        this.ctx.font = "24px Comic Sans MS";
        this.ctx.fillStyle = "black";
        // this.ctx.textAlign = "center";
        this.ctx.fillText(this.score.toFixed(0),20,25);

        this.ctx.drawImage(topScore, 472, 2, 12, 14, this.width-30, 7, 12, 14);


        if(this.score > 0 && this.score.toFixed(0) % 500 == 0) {
            console.log('hole');
            this.hasHoles = true;
            this.hole = new Hole(this.canvas, this.getRandomValue(0, this.width-50), -70);
            
        }

        if(this.score > 0 && this.score.toFixed(0) % 100 == 0) {
            // console.log('monster');
            this.hasMonsters = true;
            this.score++;
            this.monster = new Monster(this.canvas, this.getRandomValue(0, this.width-158), -50);
            console.log(this.monster.choosen);
        }
    }


    this.createTiles = function() {
        for(var i=5; i>=0; i--){
            let t = new Tile(this.canvas, this.getRandomValue(0,this.width-60), i*100);
            t.init();
            this.tiles.push(t);
        }
    }


    this.update = function() {
        dis.reqId = requestAnimationFrame(dis.update);
        // console.log(dis.reqId);
        dis.ctx.clearRect(0,0, this.width,this.height);
        dis.ctx.drawImage(background,0,0);

        if(dis.hasHoles) {
            dis.hole.draw();
        }
        

        for(var i=0; i<dis.tiles.length; i++){
            dis.tiles[i].draw();
        }

        
        dis.player.update(dis.tiles);
        dis.moveTiles();
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
                
            }
            if(dis.player.detectBulletCollisionWithMonster(dis.monster)){
                console.log('enemy die');
                dis.monster = null;
                dis.hasMonsters = false;
            }
        }
        
        // dis.playerUpdate();
        

        dis.drawTopScore();

        // console.log(dis.tiles.length);
        // dis.detectOutOfFrame();


        // setInterval(() => {
        //     dis.ctx.clearRect(0,0, this.width,this.height);
        //     dis.ctx.drawImage(background,0,0);

        //     for(var i=0; i<dis.tiles.length; i++){
        //         dis.tiles[i].draw();
        //     }


        //     // dis.player.y += dis.dy;
        //     // dis.player.draw();

            
        //     dis.player.update(dis.tiles);
        // }, 50);
    }
    // this.playerUpdate = function() {
    //     if(!(this.player.velocity<= 0 && this.player.y < 300))
    //         this.player.y += this.player.velocity;
    //     if(this.player.falling) {
    //         this.player.velocity+= 0.25;
    //     }
    //     else{
    //         this.player.velocity+=0.25;
            
    //         if(this.player.velocity == 0){
    //             this.player.falling = true;
    //             this.player.velocity = this.player.gravity;
    //         }
    //     }
    //     this.detectBorderCollision(this.tiles);

    //     if(this.player.left) {
    //         this.player.x_velocity -= 0.5;
    //     }
    //     if(this.player.right) {
    //         this.player.x_velocity += 0.5;
    //     }

    //     if(this.player.x <= 0-this.player.width){
    //         this.player.x = 400;
    //     }
    //     else if(this.player.x>=400){
    //         this.player.x = 0;
    //     }

    //     this.player.x += this.player.x_velocity;
    //     this.player.x_velocity *= 0.9;

    //     // if(this.player.y <= this.jumpThreshold) {
    //     //     this.momentum = Math.abs(this.player.velocity);
    //     //     this.player.velocity = 0;
    //     //     // this.player.y++;
    //     //     // this.player.falling = true;
    //     //     //     this.player.velocity = this.player.gravity;
    //     //     // console.log(this.momentum);
    //     // }

    //     this.moveTiles();


    //     this.player.draw();
    // }

    this.checkHeight = function() {
        
    }

    // this.detectBorderCollision = function(tiles) {
    //     for(let i=0; i<tiles.length; i++){
    //         if(this.player.x <= tiles[i].x + tiles[i].width &&
    //             this.player.x + this.player.width >= tiles[i].x &&
    //             this.player.y <= tiles[i].y + tiles[i].height &&
    //             this.player.y + this.player.height >= tiles[i].y){

    //             if(this.player.falling){

    //                 if(tiles[i].hasSpring) {
    //                     this.player.setJumpspeed(-15);
    //                     // this.player.velocity = this.player.jumpSpeed;
    //                 }
    //                 else{
    //                     this.player.setJumpspeed(-10);
    //                 }
    //                 this.player.velocity = this.player.jumpSpeed;
    //                 this.player.falling = false;
    //                 // console.log(tiles);
                    
                    
    //             }
    //         }
           
    //     }
    //     if(this.hasHoles){
    //         if(this.player.x <= this.hole.x + this.hole.width &&
    //             this.player.x + this.player.width >= this.hole.x &&
    //             this.player.y <= this.hole.y + this.hole.height &&
    //             this.player.y + this.player.height >= this.hole.y){
    
    //             console.log('die');
                
    //         }

    //     }
        
    // }

    this.moveTiles = function() {
        if(this.player.y <= this.jumpThreshold) {
            diff = this.jumpThreshold- this.player.y;
            if(this.hasHoles) {
                // this.hole.y += 2;
                if(this.player.velocity<= 0 && this.player.y < 300){
                    this.hole.y -= this.player.velocity;
                }
            }
            if(this.hasMonsters) {
                // this.monster.y += 2;
                if(this.player.velocity<= 0 && this.player.y < 300){
                    this.monster.y -= this.player.velocity;
                }
            }
            for(let i=0; i<this.tiles.length; i++) {
               
                // this.camravel = this.player.velocity;
                // this.tiles[i].y += 2;
                
                // this.tiles[i].y += this.momentum;
               
                // this.momentum -= 0.25;
                // this.momentum *= 0.9;
                // console.log(this.momentum);
                
                // if(this.momentum == 0){

                //     this.player.falling = true;
                //     this.player.velocity = this.player.gravity;
                // }
                    
                if(this.player.velocity<= 0 && this.player.y < 300){
                    this.tiles[i].y -= this.player.velocity;
                }
                
                
                // this.player.y += 2;
                this.score += 0.1;

                
               

                if(this.tiles[i].y > 700){
                   
                    this.tiles.shift();
                    
                    let t = new Tile(this.canvas, this.getRandomValue(0,this.width-60), -50);
                    t.init();
                    this.tiles.push(t);
                    
                }
                
            }
        }
        
    }

    this.createGameOverScreen = function() {
        this.ctx.font = "24px Comic Sans MS";
        this.ctx.fillStyle = "black";
        // this.ctx.textAlign = "center";
        this.ctx.fillText("game Over",(this.width/2)-50,this.height/2);
        cancelAnimationFrame(this.reqId);
    }

    // this.detectOutOfFrame = function() {
    //     for(let i=0; i<this.tiles.length; i++) {
    //         if(this.tiles[i].y > this.height){
    //             this.tiles.shift();
    //         }
    //     }
    // }

    this.getRandomValue = function(max,min){
        let val = Math.random() * (max - min) + min;
        return Math.round(val);
    }
}



// var g = new Game(canvas);

// function loadCount(){
//     loadMedia--;
//     // if(loadMedia==0){
//     //     g.init();
//     // }
        
// }

// var g = new Game('myGame');
