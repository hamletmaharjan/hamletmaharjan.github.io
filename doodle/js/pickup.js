

function Pickup(canvas, x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.canvas=canvas;
    this.ctx=this.canvas.getContext("2d");
    // this.canvas=canvas;
    
    this.pickups = {
        springShoe : {
            sx: 301,
            sy: 205,
            width: 28,
            height: 21
        },
        jetpack : {
            sx: 197,
            sy: 265,
            width: 26,
            height: 37
        },
        propellerHat : {
            sx: 332,
            sy: 236,
            width: 30,
            height: 18
        },
        rocket: {
            sx: 640,
            sy: 118,
            width: 58,
            height: 80
        },
        shield: {
            sx: 234,
            sy: 308,
            width: 35,
            height: 32
        }
    }
    let options = ['springShoe', 'jetpack', 'propellerHat', "rocket", "shield"];
    let random = parseInt(Math.random() * 5);
    this.choosen = options[random];
    // this.choosen = "shield";

    this.test = function() {
        console.log('test');
    }

    this.draw = function() {
        // this.ctx.fillRect(this.x, this.y, 40,40);
        //Shift in x for positioning closer to center and y for matching the bottom of pickup on the tile
        this.ctx.drawImage(gameTiles, this.pickups[this.choosen].sx, this.pickups[this.choosen].sy,
            this.pickups[this.choosen].width, this.pickups[this.choosen].height, 
            this.x+10, this.y-this.pickups[this.choosen].height+5, this.pickups[this.choosen].width, this.pickups[this.choosen].height);
    }

    this.update = function(y) {
        this.y = y;
        this.draw();
    }

    this.detectCollision = function(player) {
        if(player.x <= this.pickups[this.choosen].x + this.pickups[this.choosen].width &&
            player.x + this.width >= this.pickups[this.choosen].x &&
            player.y <= this.pickups[this.choosen].y + this.pickups[this.choosen].height &&
            player.y + this.height >= this.pickups[this.choosen].y){
                return true;
        }
    }
}