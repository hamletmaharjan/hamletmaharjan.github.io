function Box() {
    this.init = function(x,y,radius,color, speed) {
        this.x = x;
        this.y = y;
        this.dirx = 1;
        this.diry = 1;
        this.speed =  speed || 0.5;
        this.radius = radius;
        this.color = color || 'red';
        this.width =  this.radius * 2;
        this.height = this.radius * 2;
        this.box = document.createElement('div');
        this.box.style.width = this.width + 'px';
        this.box.style.height = this.height + 'px';
        this.box.style.position = 'absolute';
        this.box.style.left = this.x + 'px';
        this.box.style.top = this.y + 'px';
        this.box.style.backgroundColor = this.color;
        this.box.style.borderRadius = this.radius +'px';
    }
    this.draw = function(gameField) {
        gameField.appendChild(this.box);
    }

    this.move = function(){
        this.box.style.left = this.x + 'px';
        this.box.style.top = this.y + 'px';
    }
}