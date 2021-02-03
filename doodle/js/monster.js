function Monster(canvas, x, y) {
    this.x = x;
    this.y = y;
    this.width = 158;
    this.height = 45;
    this.canvas=canvas;
    this.ctx=this.canvas.getContext("2d");
    this.originalX = x;
    this.moveX = x + 20;
    this.dx = 2;
    this.dy = 1;
    this.frameCounter = 0;
    this.collisionThreshold = 10;

    this.monsters = {
        small : {
            sx: 147,
            sy: 267,
            width: 47,
            height: 34
        },
        spider : {
            sx: 336,
            sy: 169,
            width: 57,
            height: 51
        },
        flyingtwins : {
            sx: 147,
            sy: 0,
            width: 158,
            height: 45
        },
        awkwardMover : {
            sx: 64,
            sy: 187,
            width: 38,
            height: 49
        },
        awkwardMoverFlip : {
            sx: 104,
            sy: 187,
            width: 38,
            height: 49
        }
    }

    let options = ['small', 'spider', 'flyingtwins', 'awkwardMover'];
    let random = parseInt(Math.random() * 4);
    this.choosen = options[random];
    // this.choosen = "awkwardMover";

    this.init = function() {
        if(this.choosen == "awkwardMover") {
            this.moveX = canvasWidth - this.monsters[this.choosen].width;
            this.originalX = 0;
            this.dx = 1;
        }
    }

    this.draw = function() {
        this.x += this.dx;
        if(this.x>= this.moveX || this.x<= this.originalX){
            this.dx*= -1;
            if(this.choosen == "awkwardMover" || this.choosen == "awkwardMoverFlip"){
                if(this.choosen == "awkwardMover") {
                    this.choosen = "awkwardMoverFlip";
                }
                else {
                    this.choosen = "awkwardMover";
                }
            }   
        }

        if(this.choosen == "awkwardMover" || this.choosen == "awkwardMoverFlip") {
            if(this.frameCounter <= 10) {
                this.y += this.dy;
            }
            else if(this.frameCounter > 10) {
                this.dy *= -1;
                this.frameCounter = 0;
            }
            this.frameCounter++;
        }

        this.ctx.drawImage(gameTiles, this.monsters[this.choosen].sx, this.monsters[this.choosen].sy,
            this.monsters[this.choosen].width, this.monsters[this.choosen].height, 
            this.x, this.y, this.monsters[this.choosen].width, this.monsters[this.choosen].height);
    }

    this.detectCollision = function(player) {
        if(player.x <= this.x + this.monsters[this.choosen].width &&
            player.x + player.width >= this.x &&
            player.y <= this.y + this.monsters[this.choosen].height &&
            player.y + player.height >= this.y){
            if(!player.falling){
                if(player.hasPickup){
                    if(player.pickupType == "propellerHat" || player.pickupType == "jetpack" || player.pickupType == "rocket"){
                        return "shredded";
                    }
                    else if(player.pickupType == "shield"){
                        return "nothing";
                    }
                }
                return "collided";
            }
            else{
                if(player.y + player.height <= this.monsters[this.choosen].y+ this.monsters[this.choosen].height){
                    return "jumped";
                }
                return "jumped";
            } 
        }
    }

    this.detectOutOfFrame = function() {
        if(this.y >= canvasHeight) {
            return true;
        }
        return false;
    }

}