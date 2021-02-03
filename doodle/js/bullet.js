/**
 * @param  {canvas object} canvas
 * @param  {player object} player
 * @param  {float} dx
 * @param  {float} dy
 */
function Bullet(canvas, player, dx, dy) {
    this.x = Math.floor(player.x + player.width / 2);
    this.y = player.y;
    this.width = 10;
    this.height = 10;
    this.radius = 5;
    this.speed = 10;
    this.canvas=canvas;
    this.ctx=this.canvas.getContext("2d");
    this.sx = 653;
    this.sy = 0;
    this.dx = dx || 0;
    this.dy = dy || -1;

    this.draw = function() {
        // this.ctx.clearRect(0,0, 500,500);
        this.ctx.drawImage(gameTiles,this.sx, this.sy,this.width, this.height, this.x-5, this.y, this.width, this.height);
        // this.ctx.stroke();
    }


    this.update = function() {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
        this.draw();
    }

    this.detectCollision = function(monster) {
        if(this.x <= monster.x + monster.monsters[monster.choosen].width &&
            this.x + this.width >= monster.x &&
            this.y <= monster.y + monster.monsters[monster.choosen].height &&
            this.y + this.height >= monster.y){
            return true;
            // console.log('enemy dissapear');
            
        }
    }

    this.detectBorderCollision = function() {
        if(this.y <= 0 || this.x <= 0 || this.x >= canvasWidth) {
            return true;
        }
    }
}