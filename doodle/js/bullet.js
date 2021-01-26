function Bullet(canvas, player) {
    this.x = Math.floor(player.x + player.width / 2);
    this.y = player.y;
    this.width = 10;
    this.height = 10;
    this.radius = 5;
    this.speed = 10;
    this.canvas=canvas;
    this.ctx=this.canvas.getContext("2d");

    this.draw = function() {
        // this.ctx.clearRect(0,0, 500,500);
        this.ctx.drawImage(gameTiles,653, 0,10, 10, this.x-5, this.y, 10, 10);
        // this.ctx.stroke();
    }


    this.update = function() {
        this.y -= this.speed;
        this.draw();
    }

    this.detectCollision = function(enemy) {
        if(this.x <= enemy.x + enemy.width &&
            this.x + this.width >= enemy.x &&
            this.y <= enemy.y + enemy.height &&
            this.y + this.height >= enemy.y){
            return true;
            // console.log('enemy dissapear');
            
        }
    }

    this.detectBorderCollision = function() {
        if(this.y <= 0) {
            return true;
        }
    }
}