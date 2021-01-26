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

    this.img = doodleRight;
    
    this.animating = false;

    this.frameCounter = 0;
    this.bullets = [];

    var dis = this;

    


    this.draw = function() {
        this.ctx.fillStyle = "red";
        // this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    }

    this.update = function(tiles, monster) {
        // console.log(monster);
        if(!(this.velocity<= 0 && this.y < 300))
            this.y += this.velocity;
        if(this.falling) {
            this.velocity+= 0.25;
        }
        else{
            this.velocity+=0.25;
            
            if(this.velocity == 0){
                this.falling = true;
                this.velocity = this.gravity;
            }
        }
        this.detectTilesCollision(tiles);

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


        // this.moveTiles();

        if(this.animating) {
            if(this.frameCounter<=20) {
                this.frameCounter++;
            }
            else{
                this.animating = false;
                this.frameCounter = 0;
                this.img = this.previousImg;
            }
        }
       


        this.draw();
        if(this.bullets.length!=0){
            // console.log('cull');
            for(let i=0; i<this.bullets.length; i++) {
                this.bullets[i].update();

                if(this.bullets[i].detectBorderCollision()) {
                    this.bullets.shift();
                    // console.log(this.bullets.length);
                }
                // if(monster) {
                //     if(this.bullets[i].detectCollision(monster)) {
                //         console.log('dead');
                //     }
                // }
                
            }
            
        }
    }

    this.detectBulletCollisionWithMonster = function(monster) {
        if(this.bullets.length!=0){
            for(let i=0; i<this.bullets.length; i++) {
                if(this.bullets[i].detectCollision(monster)){
                    return true;
                };
            }

        }
    }

    this.detectTilesCollision = function(tiles) {
        for(let i=0; i<tiles.length; i++){
            if(this.x <= tiles[i].x + tiles[i].width &&
                this.x + this.width >= tiles[i].x &&
                this.y <= tiles[i].y + tiles[i].height &&
                this.y + this.height >= tiles[i].y){

                if(this.falling){
                    if(this.y + this.height <= tiles[i].y+ tiles[i].height){
                        if(tiles[i].hasSpring) {
                            this.setJumpspeed(-15);
                            tiles[i].inflateSpring(116, 28);
                            // this.velocity = this.jumpSpeed;
                        }
                        else{
                            this.setJumpspeed(-10);
                        }
                        this.velocity = this.jumpSpeed;
                        this.falling = false;

                    }

                    
                    // console.log(tiles);        
                    
                }
            }
           
        }
    }

    this.detectHolesCollision = function(hole) {
        if(this.x <= hole.x + hole.width &&
            this.x + this.width >= hole.x &&
            this.y <= hole.y + hole.height &&
            this.y + this.height >= hole.y){
            // console.log('die');
            // this.createGameOverScreen();
            return true;
            
        }
    }

    this.detectEnemyCollision = function(enemy) {
        if(this.x <= enemy.x + enemy.width &&
            this.x + this.width >= enemy.x &&
            this.y <= enemy.y + enemy.height &&
            this.y + this.height >= enemy.y){
            // console.log('enemy collison');
            // this.createGameOverScreen();
            if(!this.falling){
                return "collided";
            }
            else{
                return "jumped";
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
                dis.img = doodleLeft;
                // console.log(this.img);
                break;

            case 39:
                dis.right = key_state;
                dis.img = doodleRight;
                break;
            
            case 32:
                if(key_state){
                    let bullet = new Bullet(dis.canvas, dis);
                    dis.bullets.push(bullet);
                    // if(dis.img == doodleShoot){

                    // }
                    dis.previousImg = dis.img;
                    dis.img = doodleShoot;
                    dis.animating = true;
                    // console.log(bullet);

                }
                
                break;

            default:
                console.log('invalid key');
                break;
        }

    }

    this.setJumpspeed = function(value) {
        this.jumpSpeed = value;
    }


}