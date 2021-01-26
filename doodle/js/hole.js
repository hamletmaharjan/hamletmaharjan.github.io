

function Hole(canvas, x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.canvas=canvas;
    this.ctx=this.canvas.getContext("2d");

    this.draw = function() {
        this.ctx.drawImage(gameTiles, 233, 51, 68, 61, this.x, this.y, 68, 61);
    }
}