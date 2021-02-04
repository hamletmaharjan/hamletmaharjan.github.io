/**
 * @param  {Canvas Object} canvas
 * @param  {Number} x - x position of tile
 * @param  {Number} y - y position of tile
 * @param  {Number} frequency - the highter the frequency the lower the change of having pickup
 * @param  {Boolean} isOrange - sets the tile as orange, the exploading one
 */
function Tile(canvas, x ,y, frequency, isOrange) {
    this.x = x;
    this.y = y;
    this.width = 58;
    this.height = 16;
    this.canvas=canvas;
    this.ctx=this.canvas.getContext("2d");
    this.frequency = frequency;

    let ran = parseInt(Math.random()*20);
    this.hasSpring = (ran >= 18) ? true :false;
    this.hasTrampoline = (ran == 15) ? true:false;
    this.springX = getRandomValue(this.x, this.x+ this.width-19);
    this.isBlue = (ran <= 3) ? true: false;
    this.isWhite = (ran == 10) ? true: false;
    this.hasPickup = (ran == 16) ? true: false;
    this.isOrange = isOrange || false;

    this.dx = 1;
    this.img = tile;
    this.dumy = 0;
    this.springSx = 403;
    this.springSy = 100;
    this.springWidth = 19;
    this.springHeight = 12;
    this.springDiff = 5;
    this.trampolineSx = 187;
    this.trampolineSy = 97;
    this.trampolineWidth = 39;
    this.trampolineHeight = 15;
    this.trampolineDiff = 10;
    this.sy =0;
    this.frameCounter = 0;
    this.exploaded = false;

    this.positionY = {
        green: 0 ,
        blue : 18,
        white: 54,
        orange: 183
    }

    this.init = function() {
        if(this.isOrange) {
            this.hasPickup = false;
            this.hasSpring = false;
            this.hasTrampoline = false;
            this.isWhite = false;
            this.isBlue = false;
            this.sy = this.positionY.orange;
        }
        if(this.isBlue){
            this.sy = this.positionY.blue;
        }
        if(this.isWhite) {
            this.sy = this.positionY.white;
        }
        if(this.hasPickup){
            this.pickup = new Pickup(this.canvas, this.x, this.y);
        }
        
    }

    this.draw = function() {
        if(this.isBlue){
            this.x += this.dx;
            if(this.x> canvasWidth-this.width || this.x<= 0){
                this.dx*= -1;
            }
        }
        
        this.ctx.drawImage(gameTiles,0, this.sy, this.width, this.height,this.x,  this.y, this.width, this.height);
        if(this.hasSpring){
            this.ctx.drawImage(gameTiles, this.springSx, this.springSy, 19, 12, this.springX, this.y-this.springDiff, this.springWidth, this.springHeight );
        }
        else if(this.hasTrampoline) {
            this.ctx.drawImage(gameTiles, this.trampolineSx,this.trampolineSy, this.trampolineWidth, this.trampolineHeight, this.x+10,this.y-this.trampolineDiff, 39,15);
        }
        if(this.hasPickup) {
            this.pickup.update(this.y);
        }
        if(this.isOrange) {
            if(this.frameCounter>= 300 && this.frameCounter<=310) {
                this.sy = ORANGE_1;
            }
            else if(this.frameCounter >= 311 && this.frameCounter <= 320) {
                this.sy = ORANGE_2;
            }
            else if(this.frameCounter >= 321 && this.frameCounter <= 330) {
                this.sy = ORANGE_3;
            }
            else if(this.frameCounter >= 331 && this.frameCounter <= 340) {
                this.sy = ORANGE_4;
            }
            else if(this.frameCounter >= 341 && this.frameCounter <= 345) {
                this.sy = ORANGE_5;
                this.height = EXPLODE_HEIGHT;
                explodingTileSound.play();
            }
            else if(this.frameCounter >= 346 && this.frameCounter <= 350) {
                this.sy = ORANGE_6;
                this.height = EXPLODE_HEIGHT;
            }
            else if(this.frameCounter >= 351 && this.frameCounter <= 355) {
                this.sy = ORANGE_7;
                this.height = EXPLODE_HEIGHT;
            }
            else if(this.frameCounter >= 356){
                this.exploaded = true;
            }
            this.frameCounter++;
        }
    }

    this.inflateSpring = function(top, h) {  
        this.springSy = top;
        this.springDiff += h - this.springHeight ;
        this.springHeight = h;
    }

    this.inflateTrampoline = function(left, top, h) {
        this.trampolineSx = left;
        this.trampolineSy = top;
        this.trampolineDiff += h - this.trampolineHeight ;
        this.trampolineHeight = h;
    }
}