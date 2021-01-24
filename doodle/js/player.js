function Player(canvas, x ,y ,width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.canvas=canvas;
    this.ctx=this.canvas.getContext("2d");

    this.gravity = 1;
    this.velocity = this.gravity;

    // this.dy =3 ;
    this.jumpSpeed = -10;

    // this.status = ['falling', 'jumping'];
    this.falling = true;

    this.draw = function() {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.update = function(tiles) {
        this.y += this.velocity;
        if(this.falling) {
            this.velocity+= 0.25;
        }
        else{
            this.velocity+=0.25;
            console.log(this.velocity);
            if(this.velocity == 0){
                this.falling = true;
                this.velocity = this.gravity;
            }
        }
        this.detectBorderCollision(tiles);
        this.draw();
    }

    this.detectBorderCollision = function(tiles) {
        for(var i=0; i<tiles.length; i++){
            if(this.x <= tiles[i].x + tiles[i].width &&
                this.x + this.width >= tiles[i].x &&
                this.y <= tiles[i].y + tiles[i].height &&
                this.y + this.height >= tiles[i].y){
                    if(this.falling){
                        this.velocity = this.jumpSpeed;
                        this.falling = false;
                        console.log('collision');
                    }
                    

            }
            
        }
    }


}