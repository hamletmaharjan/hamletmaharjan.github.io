
function Obsticle() {
    this.x = 250;
    this.y = 350;

    this.left = 238;
    this.width = 52;
    this.height = 320;
    
    //y range range -320 to 0
    this.init = function(top, x, y) {
        this.top = top || false;
        this.x = x || 250;
        this.y = y || 350;
        this.pipe = document.createElement('div');
        this.pipe.style.position = 'absolute';
        this.pipe.style.width = this.width + 'px';
        this.pipe.style.height = this.height + 'px';
        // this.bottom = Math.random() * 112;
        this.pipe.style.left = this.left + 'px';
        this.pipe.style.top = this.y + 'px';
        // this.pipe.style.zIndex = "-1";
        
        // this.pipe.style.backgroundColor = 'red';
        if(this.top){
            this.pipe.style.backgroundImage = 'url("./images/pipe-green-top.png")';
        }
        else{
            this.pipe.style.backgroundImage = 'url("./images/pipe-green.png")';
        }
        

    }

    this.draw = function(field) {
        field.appendChild(this.pipe);
    }

    this.update = function() {
        this.pipe.style.left = this.x + 'px';
    }

    this.destory = function() {
        // this.x = 300;
                // this.pipe.style.left = '500px';
        // this.pipe.parentElement.removeChild(this.pipe);
        this.pipe.remove()
    }

    this.moveLeft = function() {
        setInterval(() => {
            this.x -= 5;
            this.pipeTop.style.left = this.x + 'px';
        }, 50);
    }

    this.getRandomValue = function(max,min){
        let val = Math.random() * (max - min) + min;
        return Math.round(val);
    }

    
}
