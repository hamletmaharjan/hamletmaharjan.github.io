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
    this.init = function() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        var background = document.getElementById('background');
        this.ctx.drawImage(background,0,0,200,200);


        this.player = new Player(this.canvas, 40,500,20,20);
        this.player.draw();

        this.tile = new Tile(this.canvas, 20,620);
        this.tiles.push(this.tile);

        this.createTiles();
        this.addListeners();
        this.update();
    }

    this.addListeners = function() {
        document.addEventListener('keydown', function(e) {
            if(e.key == "ArrowLeft"){
                // dis.vx -= 0.5;
                dis.player.x -= dis.vx;
            }
            if(e.key == "ArrowRight"){
                // dis.vx += 0.5;
                dis.player.x += dis.vx;
            }
            // dis.player.x += dis.vx;
        });
    }

    this.createTiles = function() {
        for(var i=0; i<6; i++){
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


        

        
        dis.player.update(dis.tiles);


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

    this.checkHeight = function() {
        
    }

    this.detectBorderCollision = function() {
        for(var i=0; i<this.tiles.length; i++){
            if(this.player.x < this.tiles[i].x + this.tiles[i].width &&
                this.player.x + this.player.width > this.tiles[i].x &&
                this.player.y < this.tiles[i].y + this.tiles[i].height &&
                this.player.y + this.player.height > this.tiles[i].y){

                // this.dy *= -1;

                if(this.goingDown){
                    this.player.y -= 200;
                }
                else{
                    console.log('collision');
                }
            }
            // else {
            //         this.dy += 0.3;
            //     }
        }
        
        // else {
        //     this.dy += 1;
        // }
    }

    this.getRandomValue = function(max,min){
        let val = Math.random() * (max - min) + min;
        return Math.round(val);
    }
}


var g = new Game('myGame');
g.init();