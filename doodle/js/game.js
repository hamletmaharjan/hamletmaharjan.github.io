function Tile(canvas, x ,y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 10;
    this.canvas=canvas;
    this.ctx=this.canvas.getContext("2d");

    this.draw = function() {
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function Game(canvasId) {

    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.width = 400;
    this.height = 657;
    var dis = this;
    this.dy = 2;
    this.vx = 3;
    this.tiles = [];
    this.goingDown = true;


    this.currentTile = 0;

    this.jumpThreshold = 350;

    this.init = function() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        var background = document.getElementById('background');
        this.ctx.drawImage(background,0,0,200,200);


        this.player = new Player(this.canvas, 40,500,40,40);
        this.player.draw();

        this.tile = new Tile(this.canvas, 20,620);
        this.tiles.push(this.tile);

        this.createTiles();
        // this.addListeners();

        this.player.addListeners();
        this.update();
    }


    this.createTiles = function() {
        for(var i=5; i>=0; i--){
            let t = new Tile(this.canvas, this.getRandomValue(0,300), i*100);
            this.tiles.push(t);
        }
    }


    this.update = function() {
        requestAnimationFrame(dis.update);
        dis.ctx.clearRect(0,0, this.width,this.height);
        dis.ctx.drawImage(background,0,0);

        for(var i=0; i<dis.tiles.length; i++){
            dis.tiles[i].draw();
        }

        
        // dis.player.update(dis.tiles);
        dis.playerUpdate();
        dis.moveTiles();

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
    this.playerUpdate = function() {
        this.player.y += this.player.velocity;
        if(this.player.falling) {
            this.player.velocity+= 0.25;
        }
        else{
            this.player.velocity+=0.25;
            
            if(this.player.velocity == 0){
                this.player.falling = true;
                this.player.velocity = this.player.gravity;
            }
        }
        this.detectBorderCollision(this.tiles);

        if(this.player.left) {
            this.player.x_velocity -= 0.5;
        }
        if(this.player.right) {
            this.player.x_velocity += 0.5;
        }

        if(this.player.x <= 0-this.player.width){
            this.player.x = 400;
        }
        else if(this.player.x>=400){
            this.player.x = 0;
        }

        this.player.x += this.player.x_velocity;
        this.player.x_velocity *= 0.9;

        this.player.draw();
    }

    this.checkHeight = function() {
        
    }

    this.detectBorderCollision = function(tiles) {
        for(let i=0; i<tiles.length; i++){
            if(this.player.x <= tiles[i].x + tiles[i].width &&
                this.player.x + this.player.width >= tiles[i].x &&
                this.player.y <= tiles[i].y + tiles[i].height &&
                this.player.y + this.player.height >= tiles[i].y){

                if(this.player.falling){
                    this.player.velocity = this.player.jumpSpeed;
                    this.player.falling = false;
                    console.log(tiles);
                    
                    
                }
            }
            
        }
    }

    this.moveTiles = function() {
        if(this.player.y <= this.jumpThreshold) {
            for(let i=0; i<this.tiles.length; i++) {
               
                this.tiles[i].y += 2;
                if(this.tiles[i].y > 700){
                   
                    this.tiles.shift();
                    
                    let t = new Tile(this.canvas, this.getRandomValue(0,300), -50);
                    this.tiles.push(t);
                    
                }
                
            }
        }
    }

    this.detectOutOfFrame = function() {
        for(let i=0; i<this.tiles.length; i++) {
            if(this.tiles[i].y > this.height){
                this.tiles.shift();
            }
        }
    }

    this.getRandomValue = function(max,min){
        let val = Math.random() * (max - min) + min;
        return Math.round(val);
    }
}


var g = new Game('myGame');
g.init();