function Monster(canvas, x, y) {
    this.x = x;
    this.y = y;
    this.width = 158;
    this.height = 45;
    this.canvas=canvas;
    this.ctx=this.canvas.getContext("2d");

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
    }
    let options = ['small', 'spider', 'flyingtwins'];
    let random = parseInt(Math.random() * 3);
    this.choosen = options[random];
    // this.choosen = "spider";

    this.draw = function() {
        // this.ctx.drawImage(gameTiles, 147, 0, 158, 45, this.x, this.y, this.width, this.height);
        this.ctx.drawImage(gameTiles, this.monsters[this.choosen].sx, this.monsters[this.choosen].sy,
            this.monsters[this.choosen].width, this.monsters[this.choosen].height, 
            this.x, this.y, this.monsters[this.choosen].width, this.monsters[this.choosen].height);
    }

    this.detectCollision = function(player) {
        // console.log("cc");
        if(player.x <= this.x + this.monsters[this.choosen].width &&
            player.x + player.width >= this.x &&
            player.y <= this.y + this.monsters[this.choosen].height &&
            player.y + player.height >= this.y){
            // console.log('enemy collison');
            // player.createGameOverScreen();
            if(!player.falling){
                if(player.hasPickup){
                    if(player.pickupType == "propellerHat" || player.pickupType == "jetpack"){
                        return "shredded";
                    }
                }
                return "collided";
            }
            else{
                return "jumped";
            } 
        }
    }

    // this.detectCollisionWithBullet = function(bullet) {
    //     if(bullet.x <= this.x + this.monsters[this.choosen].width &&
    //         bullet.x + bullet.width >= this.x &&
    //         bullet.y <= this.y + this.monsters[this.choosen].height &&
    //         bullet.y + bullet.height >= this.y){
    //             return true;
    //     }

    // }
}