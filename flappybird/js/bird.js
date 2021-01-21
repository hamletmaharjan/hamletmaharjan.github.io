
function Bird() {
    
    this.width = 34;
    this.height = 24;
    this.x = 72;
    this.y = 250;
    this.index = 0;
    var dis = this;
    this.images = ['redbird-downflap', 'redbird-midflap', 'redbird-upflap', 'redbird-midflap'];
    this.init = function() {
        this.bird = document.createElement('div');
        this.bird.style.width = this.width + 'px';
        this.bird.style.height = this.height + 'px';
        this.bird.style.backgroundImage = 'url("./images/redbird-midflap.png")';
        // this.bird.style.backgroundColor = 'red';
        this.bird.style.position = 'absolute';
        this.bird.style.left = this.x + 'px';
        this.bird.style.top = this.y + 'px';
    }


    this.draw = function(field){
        field.appendChild(this.bird);
    }

    this.update = function() {
        this.bird.style.top = this.y + 'px';
    }

    this.fly = function() {
        this.y -= 15;
        this.bird.style.top = this.y + 'px';
    }

    this.animate = function() {
        
        this.animationLoop = setInterval(() => {
            if(this.index>=4){
                this.index = 0;
            }
            let image = this.images[this.index];
            this.bird.style.backgroundImage = `url("./images/${image}.png`;
            this.index++;
        }, 100);
    }

    this.stopAnimation = function() {
        clearInterval(dis.animationLoop);
    }

    this.animateWings = function() {
        if(this.index>=3){
            this.index = 0;
        }
        let image = this.images[index];
        this.bird.style.backgroundImage = `url("./images/${image}.png`;
        this.index++;
    }
}