/**
 * @param  {Canvas Object} canvas
 * @param  {Number} x
 * @param  {Number} y
 */
function WoodenTile(canvas, x ,y) {
    this.x = x;
    this.y = y;
    this.width = 62;
    this.height = 16;
    this.canvas=canvas;
    this.ctx=this.canvas.getContext("2d");
    this.animating = false;
    this.sx = 0;
    this.sy = 71;
    this.frameIndex = 0;
    this.frameCounter = 0;
    this.outOfBorder = false;

    this.draw = function() {
        this.ctx.drawImage(gameTiles,this.sx, this.sy, this.width, this.height,this.x,  this.y, this.width, this.height);
    }

    this.update = function(player) {
        if(this.detectCollisionWithPlayer(player)){
            this.animating = true;
        }

        if(this.animating) {
            if(this.frameCounter>=0 && this.frameCounter<=10) {
                this.sy = 91;
                this.y += 5;
                this.height = 21;
            }
            else if(this.frameCounter >= 11 && this.frameCounter <= 20) {
                this.sy = 118;
                this.y += 5;
                this.height = 25;
            }
            else if(this.frameCounter >= 21 && this.frameCounter <= 30) {
                this.sy = 151;
                this.y += 5;
                this.height = 30;
            }
            else {
                this.y+= 5;
            }

            if(this.y >= canvasHeight) {
                this.animating = false;
                this.outOfBorder = true;
            }
            this.frameCounter++;
        }
        this.draw();
    }
    
    this.detectCollisionWithPlayer = function(player) {
        if(player.falling) {
            if(detectRectCollision(player, this)) {
                if(player.y + player.height <= this.y+ this.height){
                    woodenTileSound.play();
                    return true;
                }
            }
        }
        
    }

    this.detectOutOfBorder = function() {
        return this.outOfBorder;
    }
}