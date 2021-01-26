
function Tile(canvas, x ,y) {
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 15;
    this.canvas=canvas;
    this.ctx=this.canvas.getContext("2d");

    let ran = Math.random()*10;
    this.hasSpring = (ran >= "9") ? true :false;
    this.springX = getRandomValue(this.x, this.x+ this.width);

    this.isBlue = (ran <= "2") ? true: false;

    this.dx = 1;
    this.img = tile;

    this.dumy = 0;

    this.springSx = 403;
    this.springSy = 100;
    this.springWidth = 19;
    this.springHeight = 12;
    this.diff = 5;
    this.init = function() {
        if(this.isBlue){
            this.img = tileBlue;
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
        
        this.ctx.drawImage(this.img,this.x,  this.y, this.width, this.height);
        if(this.hasSpring){
            this.ctx.drawImage(gameTiles, this.springSx, this.springSy, 19, 12, this.springX, this.y-this.diff, this.springWidth, this.springHeight );
            // this.ctx.fillRect(this.springX, this.y-10, 10, 12);
        }
        
    }

    this.inflateSpring = function(sy, h) {  
        this.springSy = sy;
        this.diff += h - this.springHeight ;
        this.springHeight = h;
    }

    
}