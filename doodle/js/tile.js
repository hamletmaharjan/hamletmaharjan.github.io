

function Tile(canvas, x ,y) {
    this.x = x;
    this.y = y;
    this.width = 58;
    this.height = 16;
    this.canvas=canvas;
    this.ctx=this.canvas.getContext("2d");

    let ran = parseInt(Math.random()*20);
    this.hasSpring = (ran >= 18) ? true :false;
    this.springX = getRandomValue(this.x, this.x+ this.width-19);

    this.isBlue = (ran <= 3) ? true: false;
    this.isWhite = (ran == 10) ? true: false;


    this.hasPickup = (ran == 7) ? true: false;

    this.dx = 1;
    this.img = tile;

    this.dumy = 0;

    this.springSx = 403;
    this.springSy = 100;
    this.springWidth = 19;
    this.springHeight = 12;
    this.diff = 5;

    this.sy =0;


    this.positionY = {
        green: 0 ,
        blue : 18,
        white: 54
        
    }

    var dis = this;
    this.init = function() {
        if(this.isBlue){
            this.sy = this.positionY.blue;
        }
        if(this.isWhite) {
            this.sy = this.positionY.white;
        }
        if(this.hasPickup){
            this.pickup = new Pickup(this.canvas, this.x, this.y);
        }
        
        
    }

    this.draw = function() {
        // this.ctx.fillStyle = "green";
        // this.ctx.fillRect(this.x, this.y, this.width, this.height);
        if(this.isBlue){
            
            this.x += this.dx;
            if(this.x> 400-this.width || this.x<= 0){
                this.dx*= -1;
            }
        }
        
        this.ctx.drawImage(gameTiles,0, this.sy, this.width, this.height,this.x,  this.y, this.width, this.height);
        if(this.hasSpring){
            this.ctx.drawImage(gameTiles, this.springSx, this.springSy, 19, 12, this.springX, this.y-this.diff, this.springWidth, this.springHeight );
            // this.ctx.fillRect(this.springX, this.y-10, 10, 12);
        }

        if(this.hasPickup) {
            this.pickup.update(this.y);
        }
        
        
    }

    this.inflateSpring = function(sy, h) {  
        this.springSy = sy;
        this.diff += h - this.springHeight ;
        this.springHeight = h;
    }

    
}