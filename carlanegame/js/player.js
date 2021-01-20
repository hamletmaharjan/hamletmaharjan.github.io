
function Player() {
    
    this.width = 50;
    this.height = 100;
    this.index = 1;
    this.lanes = 3;
    this.top = 0;
    this.y = 500;
    this.positions = [25, 125, 225];

    this.init = function() {
        this.car = document.createElement('div');
       
        this.car.style.position = 'absolute';
        this.car.style.width = this.width + 'px';
        this.car.style.height = this.height + 'px';
        this.car.style.backgroundImage = 'url("./images/car-red.png")';
        this.car.style.backgroundSize = 'contain';
        this.car.style.backgroundRepeat = 'no-repeat';
        
        this.car.style.left = this.positions[1] + 'px';
        this.x = this.positions[1];
        this.index = 1;
        
        this.car.style.top = this.y + 'px';
        
    }

    this.draw = function(field) {
        field.appendChild(this.car);
    }


    this.toLeft = function() {
        if(this.index <= 0){
            console.log('edge');
        }
        else{
            this.index--;
        }
        this.x = this.positions[this.index];
        this.car.style.left = this.positions[this.index] + 'px';
    }

    this.toRight = function() {
        if(this.index >= this.lanes-1){
            console.log('edge');
        }
        else{
            this.index++;
           
        }
        this.x = this.positions[this.index];
        this.car.style.left = this.positions[this.index] + 'px';
    }


}
