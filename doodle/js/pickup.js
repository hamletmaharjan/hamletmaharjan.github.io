

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
            sx: 224,
            sy: 282,
            width: 24,
            height: 18
        },
    }
    let options = ['springShoe', 'jetpack', 'propellerHat'];
    let random = parseInt(Math.random() * 3);
    this.choosen = options[random];

    this.test = function() {
        console.log('test');
    }

    this.draw = function() {
        // this.ctx.fillRect(this.x, this.y, 40,40);
        this.ctx.drawImage(gameTiles, this.pickups[this.choosen].sx, this.pickups[this.choosen].sy,
            this.pickups[this.choosen].width, this.pickups[this.choosen].height, 
            this.x+10, this.y-this.pickups[this.choosen].height+5, this.pickups[this.choosen].width, this.pickups[this.choosen].height);
    }

    this.update = function(y) {
        this.y = y;
        this.draw();
    }
}