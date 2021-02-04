/**
 * @param  {Canvas Object} canvas
 * @param  {Number} x
 * @param  {Number} y
 */
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
    this.jumpSpeed = -10;
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
    this.propellerWidth = 29;
    this.propellerHeight = 27;
    this.angle = 0;
    let dis = this;

    this.draw = function() {
        //Rotates the doodler if the condition meets
        if (this.isRotating) {
            this.angle += ANGLE_MULTIPLE * Math.PI / 180;
            this.ctx.save();
            this.ctx.translate(this.x + ADDITIONAL_TRANSLATION_X, this.y + ADDITIONAL_TRANSLATION_Y);        
            this.ctx.rotate(this.angle);
            this.ctx.drawImage(this.img,this.width / -2, this.height / -2, this.width, this.height);        
            this.ctx.restore(); 
        }
        else{
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
        
        //Draws pickup items on top of the doodler if haspickup
        if (this.hasPickup) {
            if (this.pickupType == "propellerHat") {
                this.ctx.drawImage(gameTiles,671, 38, 32, 19, this.x+15, this.y, 32, 19);
            }
            else if (this.pickupType == "shield") {
                this.ctx.drawImage(doodleShield, this.x-5, this.y, this.width+10,this.height+15);
            }
        }
    }

    this.update = function(tiles) {
        /* If player is jumping and it's threshold height is less than
        *  threshold, it y value decrease and it goes up else it's y position stays same
        */
        if (!(this.velocity<= 0 && this.y < JUMP_THRESHOLD)){
            this.y += this.velocity;
        }   
        if (this.falling) {
            this.velocity+= this.acceleration;
        }
        else{
            this.velocity+= this.acceleration;
            if (this.velocity >= 0) {
                this.isRotating = false;
                this.acceleration = TRUE_ACCELERATION;
                this.width = this.trueWidth;
                this.height = this.trueHeight;
                if (this.hasPickup) {
                    //Spring shoe and shield last longer than one jump so haspickup flag stays true
                    if (this.pickupType != "springShoe" && this.pickupType!= "shield") {
                        this.hasPickup = false;
                    }  
                    if (this.pickupType == "jetpack" || this.pickupType == "rocket") {
                        this.img = doodleRight;
                        this.hasPickup = false;
                    }
                }
                this.falling = true;
                this.velocity = this.gravity;
            }
        }
        this.detectTilesCollision(tiles);
        if (this.left) {
            this.x_velocity -= X_VELOCITY;
        }
        if (this.right) {
            this.x_velocity += X_VELOCITY;
        }

        //If doodler goes beyond left border, appear from right
        if (this.x <= 0-this.width) {
            this.x = canvasWidth;
        }
        //If doodler goes beyond right border, appear from left
        else if (this.x >= canvasWidth) {
            this.x = -this.width;
        }
        this.x += this.x_velocity;
        this.x_velocity *= FRICTION;

        //The main purpose is to go back to previous doodler state after shooting once
        if (this.animating) {
            if (this.frameCounter <= ANIMATION_FRAME_THRESHOLD) {
                this.frameCounter++;
            }
            else{
                this.animating = false;
                this.frameCounter = 0;
                this.img = this.previousImg;
            }
        }

        this.draw();
        if (this.bullets.length!=0) {
            for(let i=0; i<this.bullets.length; i++) {
                this.bullets[i].update();
                if (this.bullets[i].detectBorderCollision()) {
                    this.bullets.shift();
                }
            }
        }
    }

    this.detectOutOfFrame = function(value) {
        if (this.y >= value) {
            return true;
        }
    }

    this.detectBulletCollisionWithMonster = function(monster) {
        if (this.bullets.length!=0) {
            for(let i=0; i<this.bullets.length; i++) {
                if (this.bullets[i].detectCollision(monster)) {
                    this.bullets.shift();
                    return true;
                };
            }
        }
    }

    this.detectTilesCollision = function(tiles) {
        for(let i=0; i<tiles.length; i++) {
            if (detectRectCollision(this, tiles[i])) {     
                if (!this.hasPickup) {
                    if (tiles[i].hasPickup) {
                        if (tiles[i].pickup.choosen == "propellerHat") {
                            this.jumpSpeed = MEDIUM_JUMP_SPEED;
                            this.velocity = this.jumpSpeed;
                            this.falling = false;
                            this.acceleration = SLOW_ACCELERATION;
                            this.hasPickup = true;
                            this.pickupType = "propellerHat";
                            this.isRotating = false;
                            propellerSound.play();
                            tiles[i].hasPickup = false;
                        }
                        else if (tiles[i].pickup.choosen == "jetpack") {
                            this.jumpSpeed = JETPACK_JUMP_SPEED;
                            this.velocity = this.jumpSpeed;
                            this.falling = false;
                            this.acceleration = SLOW_ACCELERATION;
                            this.hasPickup = true;
                            this.pickupType = "jetpack";
                            if (this.left) {
                                this.img = doodleLeftJetpack;
                            }
                            else{
                                this.img = doodleRightJetpack;
                            }
                            this.isRotating = false;
                            jetpackSound.play();
                            tiles[i].hasPickup = false;
                        }
                        else if (tiles[i].pickup.choosen == "rocket") {
                            this.jumpSpeed = ROCKET_JUMP_SPEED;
                            this.velocity = this.jumpSpeed;
                            this.falling = false;
                            this.acceleration = SLOW_ACCELERATION;
                            this.hasPickup = true;
                            this.pickupType = "rocket";
                            this.img = doodleRocket;
                            this.width = ROCKET_WIDTH;
                            this.height = ROCKET_HEIGHT;
                            rocketSound.play();
                            this.isRotating = false;
                            tiles[i].hasPickup = false;
                        }
                        
                    }
                }
                
                if (this.falling) {
                    if (this.y + this.height <= tiles[i].y+ tiles[i].height) {
                        if (this.hasPickup) {
                            if (tiles[i].hasSpring) {
                                if (this.x <= tiles[i].springX + tiles[i].springWidth &&
                                    this.x + this.width >= tiles[i].springX) {
                                        this.jumpSpeed = MEDIUM_JUMP_SPEED;
                                        tiles[i].inflateSpring(116, 28);
                                        springShoeSound.play();
                                }
                                else if (this.pickupType == "springShoe") {
                                    this.jumpSpeed = MEDIUM_JUMP_SPEED;
                                    springShoeSound.play();
                                }
                                else{
                                    this.jumpSpeed = LOWEST_JUMP_SPEED;
                                    jumpSound.play();
                                }
                            }
                            else if (tiles[i].hasTrampoline) {
                                this.isRotating = true;
                                this.jumpSpeed = MEDIUM_JUMP_SPEED;
                                this.angle= 0;
                                tiles[i].inflateTrampoline(148,93, 19);
                                trampolineSound.play();
                            }
                            else if (this.pickupType == "springShoe") {
                                this.jumpSpeed = MEDIUM_JUMP_SPEED;
                                springShoeSound.play();
                            }
                            else{
                                this.jumpSpeed = LOWEST_JUMP_SPEED;
                                jumpSound.play();
                            }
                        }
                        else{
                            if (tiles[i].hasSpring) {
                                if (this.x <= tiles[i].springX + tiles[i].springWidth &&
                                    this.x + this.width >= tiles[i].springX) {
                                    this.jumpSpeed = MEDIUM_JUMP_SPEED;
                                    tiles[i].inflateSpring(116, 28);
                                    springShoeSound.play();
                                    // this.velocity = this.jumpSpeed;
                                }
                                else{
                                    this.jumpSpeed = LOWEST_JUMP_SPEED;
                                    jumpSound.play();
                                }
                            }
                            else if (tiles[i].hasTrampoline) {
                                this.isRotating = true;
                                this.jumpSpeed = MEDIUM_JUMP_SPEED;
                                this.angle= 0; 
                                tiles[i].inflateTrampoline(148,93, 19);
                                trampolineSound.play();
                            }
                            else if (tiles[i].hasPickup) {
                                if (tiles[i].pickup.choosen == "springShoe") {
                                    console.log('spring');
                                    this.hasPickup = true;
                                    this.pickupType = "springShoe";
                                    this.springJumpCounter = SPRING_JUMP_COUNT;
                                    this.jumpSpeed = MEDIUM_JUMP_SPEED;
                                    if (this.left) {
                                        this.img = doodleLeftSpring;
                                    }
                                    else {
                                        this.img = doodleRightSpring;
                                    }
                                    springShoeSound.play();
                                    tiles[i].hasPickup = false;
                                }
                                else if (tiles[i].pickup.choosen == "shield") {
                                    this.hasPickup = true;
                                    this.pickupType = "shield";
                                    this.shieldCounter = SHIELD_COUNT;
                                    jumpSound.play();
                                    tiles[i].hasPickup = false;
                                }
                            }
                            else {
                                this.jumpSpeed = LOWEST_JUMP_SPEED;
                                jumpSound.play();
                            }
                        }
                        
                        this.velocity = this.jumpSpeed;
                        this.falling = false;
                        this.acceleration = TRUE_ACCELERATION;

                        if (this.springJumpCounter == 0) {
                            this.hasPickup = false;
                        }
                        this.springJumpCounter--;
                        if (this.shieldCounter == 0) {
                            this.hasPickup = false;
                        }
                        this.shieldCounter--;
                       
                        if (tiles[i].isWhite) {
                            /* Spawns the disappeared white tile in the position where it is supposed to be
                                if it were to disappear out of border
                            */
                            let temp = canvasHeight - tiles[i].y;
                            let t = new Tile(this.canvas, getRandomValue(0,360), -temp-50);
                            tiles.splice(i,1);
                            t.init();
                            tiles.push(t);
                        }
                    }      
                }
            }
        }
    }

    this.detectHolesCollision = function(hole) {
        if (detectRectCollision(this, hole)) {
            if (this.hasPickup) {
                if (this.pickupType == "rocket" || this.pickupType == "jetpack") {
                    return false;
                }
            }
            return true;
        }
    }

    this.addListeners = function() {
        window.addEventListener("keydown", this.keyListener);
        window.addEventListener("keyup", this.keyListener);

        //only adds mousedown listener if directional shooting is on
        if (directionalShooting == "on" && gameState == "playing") {
            window.addEventListener("mousedown", this.clickListener);
        }
    }

    this.clickListener = function(e) {
        // Get the direction in x and y
        let dx = (e.offsetX - dis.x);
        let dy = (e.offsetY - dis.y);

        // Normalize the direction
        let mag = Math.sqrt(dx * dx + dy * dy);
        let vx = (dx / mag);
        let vy = (dy / mag);
       
        if (dis.hasPickup) {
            if (dis.pickupType == "springShoe") {
                let bullet = new Bullet(dis.canvas, dis, vx, vy);
                dis.bullets.push(bullet);
                dis.img = doodleShootSpring;
                bulletSound.play();
            }
            else if (dis.pickupType == "shield") {
                let bullet = new Bullet(dis.canvas, dis, vx, vy);
                dis.bullets.push(bullet);
                dis.img = doodleShoot;
                bulletSound.play();
            }
        }
        else{
            let bullet = new Bullet(dis.canvas, dis, vx, vy);
            dis.bullets.push(bullet);
            dis.img = doodleShoot;
            bulletSound.play();
        }
    }

    this.keyListener = function(e) {
        let key_state = (e.type == "keydown") ? true: false;
        switch(e.keyCode) {
            case 37:
                dis.left = key_state;
                if (dis.hasPickup) {
                    if (dis.pickupType == "springShoe") {
                        dis.img = doodleLeftSpring;
                    }
                    else if (dis.pickupType == "jetpack") {
                        dis.img = doodleLeftJetpack;
                    }
                    else if (dis.pickupType == "rocket") {
                        dis.img = doodleRocket;
                    }
                    else{
                        dis.img = doodleLeft;
                    }
                }
                else{
                    dis.img = doodleLeft;
                }
                break;

            case 39:
                dis.right = key_state;
                if (dis.hasPickup) {
                    if (dis.pickupType == "springShoe") {
                        dis.img = doodleRightSpring;
                    }
                    else if (dis.pickupType == "jetpack") {
                        dis.img = doodleRightJetpack;
                    }
                    else if (dis.pickupType == "rocket") {
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
                if (key_state) {
                    dis.previousImg = dis.img;
                    if (dis.hasPickup) {
                        if (dis.pickupType == "springShoe") {
                            let bullet = new Bullet(dis.canvas, dis);
                            dis.bullets.push(bullet);
                            dis.img = doodleShootSpring;
                            bulletSound.play();
                        }
                        else if (dis.pickupType == "shield") {
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