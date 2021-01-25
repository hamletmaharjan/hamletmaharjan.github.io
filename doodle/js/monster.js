function Monster(canvas, x, y) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.canvas=canvas;
    this.ctx=this.canvas.getContext("2d");

    this.draw = function() {
        this.ctx.drawImage(gameTiles, 147, 0, 158, 45, this.x, this.y, 158, 45);
    }
}