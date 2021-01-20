
function Enemy() {
    this.width = 50;
    this.height = 100;
    this.index = 1;
    this.lanes = 3;
    this.y = 0;
    this.positions = [25, 125, 225];
    this.backgroundImages = ['car-yellow', 'car-green', 'car-blue'];

    this.init = function(ind, y) {
        this.y = y || 0
        this.car = document.createElement('div');
        this.car.style.position = 'absolute';
        this.car.style.width = this.width + 'px';
        this.car.style.height = this.height + 'px';
        let value = this.backgroundImages[this.getRandomValue(2,0)];
        
        this.car.style.backgroundImage = `url("./images/${value}.png")`;
        this.car.style.backgroundSize = 'contain';
        this.car.style.backgroundRepeat = 'no-repeat'; 
        this.car.style.left = this.positions[ind] + 'px';
        this.x = this.x = this.positions[ind];
        this.car.style.top = this.y + 'px';
        
    }

    this.draw = function(field) {
        field.appendChild(this.car);
    }

    this.update = function() {
        this.car.style.top = this.y + 'px';
    }

    this.destroy = function() {
        this.car.parentElement.removeChild(this.car);
    }

    this.getRandomValue = function(max,min){
        let val = Math.random() * (max - min) + min;
        return Math.round(val);
    }

}