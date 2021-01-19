
function Ant() {
    this.init = function(x,y,radius) {
        this.x = x;
        this.y = y;
        this.dirx = 1;
        this.diry = 1;
        this.radius = radius;
        this.speed = 2;
        this.width =  this.radius * 2;
        this.height = this.radius * 2;
        this.box = document.createElement('div');
        this.box.style.width = this.width + 'px';
        this.box.style.height = this.height + 'px';
        this.box.style.position = 'absolute';
        this.box.style.left = this.x + 'px';
        this.box.style.top = this.y + 'px';
        this.box.style.backgroundImage = 'url("./images/annt.gif")';
        this.box.style.backgroundSize = this.width + 'px ' + this.height + 'px';
        this.box.classList.add('ant');
        // this.box.style.backgroundColor = this.color;
        // this.box.style.borderRadius = this.radius +'px';
    }
    this.draw = function(gameField) {
        gameField.appendChild(this.box);
        let dis = this;
        this.box.addEventListener('click',function(){
            console.log('clik');
            dis.box.parentElement.removeChild(dis.box);
        });
    }

    this.move = function(){
        this.box.style.left = this.x + 'px';
        this.box.style.top = this.y + 'px';
    }
}