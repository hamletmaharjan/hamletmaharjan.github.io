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

    this.left = false;
    this.right = false;
    this.shoot = false;

    this.x_velocity = 0;

    

    var dis = this;

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

        if(this.left) {
            this.x_velocity -= 0.5;
        }
        if(this.right) {
            this.x_velocity += 0.5;
        }

        if(this.x <= 0-this.width){
            this.x = 400;
        }
        else if(this.x>=400){
            this.x = 0;
        }

        this.x += this.x_velocity;
        this.x_velocity *= 0.9;

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

    this.addListeners = function() {
        window.addEventListener("keydown", this.keyListener);
        window.addEventListener("keyup", this.keyListener);
    }

    this.keyListener = function(e) {
        // console.log(dis.left);
        var key_state = (e.type == "keydown") ? true: false;

        switch(e.keyCode) {
            case 37:
                dis.left = key_state;
                break;

            case 39:
                dis.right = key_state;
                break;

            default:
                console.log('invalid key');
                break;
        }

    }


}