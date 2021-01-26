function Monster(canvas, x, y) {
    this.x = x;
    this.y = y;
    this.width = 158;
    this.height = 45;
    this.canvas=canvas;
    this.ctx=this.canvas.getContext("2d");

    this.draw = function() {
        this.ctx.drawImage(gameTiles, 147, 0, 158, 45, this.x, this.y, this.width, this.height);
    }
}