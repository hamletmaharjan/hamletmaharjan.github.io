/**
 * @param  {Canvas Object} canvas
 * @param  {Number} x
 * @param  {Number} y
 */
function Hole(canvas, x, y) {
    this.x = x;
    this.y = y;
    this.width = 68;
    this.height = 61;
    this.canvas=canvas;
    this.ctx=this.canvas.getContext("2d");

    this.sx = 233;
    this.sy = 51;
    this.swidth = 68;
    this.sheight = 61;

    this.draw = function() {
        this.ctx.drawImage(gameTiles, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
    }
}