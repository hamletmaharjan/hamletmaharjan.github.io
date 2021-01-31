function Player(canvas, x ,y) {
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.trueWidth = 60;
    this.trueHeight = 60;
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

    this.hasPickup = false;
    this.pickupType = "";

    this.acceleration = 0.25;

    this.propellerFrameCounter = 0;
    // this.propellerFrames = [[]];
    this.propellerWidth = 29;
    this.propellerHeight = 27;


    // this.jetpackFrame


    var dis = this;

    
    this.angle = 0;

    this.draw = function() {
        this.ctx.fillStyle = "red";
        // this.ctx.fillRect(this.x, this.y, this.width, this.height);
        // this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        if(this.isRotating){
            this.angle += 6 * Math.PI / 180;
            this.ctx.save();
            this.ctx.translate(this.x+25, this.y+ 25);        
            this.ctx.rotate(this.angle);
        
            this.ctx.drawImage(this.img,this.width / -2, this.height / -2, this.width, this.height);        
            this.ctx.restore(); 
        }
        else{
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
        

        if(this.hasPickup) {
            if(this.pickupType == "propellerHat") {
                this.ctx.drawImage(gameTiles,671, 38, 32, 19, this.x+15, this.y, 32, 19);
            }
            else if(this.pickupType == "shield") {
                this.ctx.drawImage(doodleShield, this.x-5, this.y, this.width+10,this.height+15);
                // this.ctx.fillRect(this.x, this.y, 10,10);
            }
            
        }

    }

    this.update = function(tiles) {
        // console.log(monster);
        if(!(this.velocity<= 0 && this.y < 300))
            this.y += this.velocity;
        if(this.falling) {
            this.velocity+= this.acceleration;
        }
        else{
            this.velocity+= this.acceleration;
            
            if(this.velocity >= 0){
                this.isRotating = false;
                this.acceleration = 0.25;
                this.width = this.trueWidth;
                this.height = this.trueHeight;
                if(this.hasPickup){
                    if(this.pickupType != "springShoe" && this.pickupType!= "shield") {
                        this.hasPickup = false;
                    }  
                    // if(this.hasPickup){
                        if(this.pickupType == "jetpack" || this.pickupType == "rocket") {
                            this.img = doodleRight;
                            this.hasPickup = false;
                        }
                    // }

                }
                
                
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
            this.x = -this.width;
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

    this.detectOutOfFrame = function(value) {
        if(this.y >= value) {
            return true;
        }
    }

    this.detectBulletCollisionWithMonster = function(monster) {
        if(this.bullets.length!=0){
            for(let i=0; i<this.bullets.length; i++) {
                if(this.bullets[i].detectCollision(monster)){
                    this.bullets.shift();
                    return true;
                };
                // return monster.detectCollisionWithBullet(this.bullets[i]);
            }

        }
    }

    this.detectTilesCollision = function(tiles) {
        for(let i=0; i<tiles.length; i++){
            if(detectRectCollision(this, tiles[i])){     
                if(!this.hasPickup){
                    if(tiles[i].hasPickup) {
                        if(tiles[i].pickup.choosen == "propellerHat") {
                            this.setJumpspeed(-15);
                            this.velocity = this.jumpSpeed;
                            this.falling = false;
                            this.acceleration = 0.10;
                            this.hasPickup = true;
                            this.pickupType = "propellerHat";
                            this.isRotating = false;
                            propellerSound.play();
                        }
                        else if(tiles[i].pickup.choosen == "jetpack") {
                            this.setJumpspeed(-20);
                            this.velocity = this.jumpSpeed;
                            this.falling = false;
                            this.acceleration = 0.10;
                            this.hasPickup = true;
                            this.pickupType = "jetpack";
                            if(this.left){
                                this.img = doodleLeftJetpack;
                            }
                            else{
                                this.img = doodleRightJetpack;
                            }
                            this.isRotating = false;
                            jetpackSound.play();
                        }
                        else if(tiles[i].pickup.choosen == "rocket") {
                            this.setJumpspeed(-30);
                            this.velocity = this.jumpSpeed;
                            this.falling = false;
                            this.acceleration = 0.10;
                            this.hasPickup = true;
                            this.pickupType = "rocket";
                            this.img = doodleRocket;
                            this.width = 72;
                            this.height = 129;
                            rocketSound.play();

                            this.isRotating = false;
                            
                        }
                    }

                }
                

                if(this.falling){
                    if(this.y + this.height <= tiles[i].y+ tiles[i].height){
                        if(this.hasPickup){
                            if(tiles[i].hasSpring) {
                                if(this.x <= tiles[i].springX + tiles[i].springWidth &&
                                    this.x + this.width >= tiles[i].springX){
                                        this.setJumpspeed(-15);
                                        tiles[i].inflateSpring(116, 28);
                                        springShoeSound.play();
                                        // this.velocity = this.jumpSpeed;
                                }
                                else if (this.pickupType == "springShoe"){
                                    this.setJumpspeed(-15);
                                    springShoeSound.play();
                                }
                                else{
                                    this.setJumpspeed(-10);
                                    jumpSound.play();
                                }
                               
                            }
                            else if(tiles[i].hasTrampoline) {
                                this.isRotating = true;
                                this.setJumpspeed(-15);
                                this.angle= 0;

                                tiles[i].inflateTrampoline(148,93, 19);
                                
                                trampolineSound.play();
                            }
                            else if(this.pickupType == "springShoe"){
                                this.setJumpspeed(-15);
                                springShoeSound.play();
                            }
                            else{
                                this.setJumpspeed(-10);
                                
                                jumpSound.play();
                            }
                        }
                        else{
                            if(tiles[i].hasSpring) {
                                if(this.x <= tiles[i].springX + tiles[i].springWidth &&
                                    this.x + this.width >= tiles[i].springX){
                                    this.setJumpspeed(-15);
                                    tiles[i].inflateSpring(116, 28);
                                    springShoeSound.play();
                                    // this.velocity = this.jumpSpeed;
                                }
                                else{
                                    this.setJumpspeed(-10);
                                    jumpSound.play();
                                }
                            }
                            else if(tiles[i].hasTrampoline) {
                                this.isRotating = true;
                                this.setJumpspeed(-15);
                                this.angle= 0;
                                
                                tiles[i].inflateTrampoline(148,93, 19);

                                trampolineSound.play();
                            }
                            else if(tiles[i].hasPickup) {
                                if(tiles[i].pickup.choosen == "springShoe") {
                                    console.log('spring');
                                    this.hasPickup = true;
                                    this.pickupType = "springShoe";
                                    this.springJumpCounter = 5;
                                    this.setJumpspeed(-15);
                                    if(this.left){
                                        this.img = doodleLeftSpring;
                                    }
                                    else{
                                        this.img = doodleRightSpring;
                                    }
                                    springShoeSound.play();
                                }
                                else if(tiles[i].pickup.choosen == "shield") {
                                    this.hasPickup = true;
                                    this.pickupType = "shield";
                                    this.shieldCounter = 3;
                                    jumpSound.play();
                                }
                            }
                            
                            else{
                                this.setJumpspeed(-10);
                                jumpSound.play();
                            }

                        }
                        
                        this.velocity = this.jumpSpeed;
                        this.falling = false;
                        this.acceleration = 0.25;

                        if(this.springJumpCounter == 0){
                            this.hasPickup = false;
                        }
                        
                        this.springJumpCounter--;

                        if(this.shieldCounter == 0){
                            this.hasPickup = false;
                        }
                        
                        this.shieldCounter--;
                       
                        

                        if(tiles[i].isWhite) {
                            let temp = 657-tiles[i].y;
                            let t = new Tile(this.canvas, getRandomValue(0,360), -temp-50);
                            tiles.splice(i,1);
                            
                            t.init();
                            tiles.push(t);
                        }

                    }

                    
                    // console.log(tiles);        
                    
                }
            }
           
        }
    }

    this.detectHolesCollision = function(hole) {
        if(detectRectCollision(this, hole)){
            if(this.hasPickup){
                if(this.pickupType == "rocket" || this.pickupType == "jetpack") {
                    return false;
                }
            }
            return true;
            
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
                if(dis.hasPickup){
                    if(dis.pickupType == "springShoe") {
                        dis.img = doodleLeftSpring;
                    }
                    else if(dis.pickupType == "jetpack") {
                        dis.img = doodleLeftJetpack;
                    }
                    else if(dis.pickupType == "rocket") {
                        dis.img = doodleRocket;
                    }
                    else{
                        dis.img = doodleLeft;
                    }
                }
                else{
                    dis.img = doodleLeft;
                }
                
                // console.log(this.img);
                break;

            case 39:
                dis.right = key_state;
                if(dis.hasPickup){
                    if(dis.pickupType == "springShoe") {
                        dis.img = doodleRightSpring;
                    }
                    else if(dis.pickupType == "jetpack") {
                        dis.img = doodleRightJetpack;
                    }
                    else if(dis.pickupType == "rocket") {
                        dis.img = doodleRocket;
                    }
                    else{
                        dis.img = doodleRight;
                    }
                }
                else{
                    dis.img = doodleRight;
                }
                
                break;
            
            case 32:
                if(key_state){
                    
                    // if(dis.img == doodleShoot){

                    // }
                    dis.previousImg = dis.img;
                    if(dis.hasPickup){
                        if(dis.pickupType == "springShoe") {
                            let bullet = new Bullet(dis.canvas, dis);
                            dis.bullets.push(bullet);
                            dis.img = doodleShootSpring;
                            bulletSound.play();
                        }
                        else if(dis.pickupType == "shield") {
                            let bullet = new Bullet(dis.canvas, dis);
                            dis.bullets.push(bullet);
                            dis.img = doodleShoot;
                            bulletSound.play();
                        }
                        else{
                            console.log("cant fire");
                        }
                        
                    }
                    else{
                        let bullet = new Bullet(dis.canvas, dis);
                        dis.bullets.push(bullet);
                        dis.img = doodleShoot;
                        bulletSound.play();
                    }
                    
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