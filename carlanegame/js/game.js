function Car() {
    
    this.width = 50;
    this.height = 100;
    this.index = 1;
    this.lanes = 3;
    this.positions = [25, 125, 225];
    // this.isPlayer = false;

    this.init = function(isPlayer,ind , y) {
        this.isPlayer = isPlayer || false;
        this.car = document.createElement('div');
        // this.x = x;
        this.y = y;
        this.car.style.position = 'absolute';
        this.car.style.width = this.width + 'px';
        this.car.style.height = this.height + 'px';
        this.car.style.backgroundImage = 'url("./images/car-red.png")';
        this.car.style.backgroundSize = 'contain';
        this.car.style.backgroundRepeat = 'no-repeat';
        if(this.isPlayer){
            this.car.style.left = this.positions[this.index] + 'px';
        }
        else{
            this.car.style.left = this.positions[ind] + 'px';
        }
        
        this.car.style.top = this.y + 'px';
        console.log(this.isPlayer);
        
    }

    this.spawn = function() {
        
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
        this.car.style.left = this.positions[this.index] + 'px';
    }

    this.toRight = function() {
        if(this.index >= this.lanes-1){
            console.log('edge');
        }
        else{
            this.index++;
           
        }
        
        this.car.style.left = this.positions[this.index] + 'px';
    }

    this.toIndex = function(ind) {

    }

    this.move = function() {
        this.car.style.top += this.y + 'px';
    }

    this.moveDown = function() {
        setInterval(() => {
            this.y += 10;
        }, 500);
    }
}


function Game() {

    this.cars = [];
    this.width = 300;
    this.height = 600;
    this.init = function(fieldId) {
        this.field = document.getElementById(fieldId);
        this.field.style.width = this.width + 'px';
        this.field.style.height = this.height + 'px';
        this.field.style.backgroundColor = 'red';

        var c = new Car();
        c.init(true,20,500);
        c.draw(this.field);
        document.addEventListener('keydown', function(e) {
            switch(e.key){
                case 'a':
                    console.log('left');
                    c.toLeft();
                    break;
                case 'd':
                    console.log('right');
                    c.toRight();
                    break;
                default:
                    console.log('wrong key');
                    break;
            }
            
        });

        // var enemyCar = new Car();
        // enemyCar.init(false, 0, 0);
        // enemyCar.draw(this.field);
        // this.cars.push(enemyCar);
        // this.update();

        // var x = setInterval(() => {
        //     var car = new Car();
        //     car.init(false, this.getRandomValue(2,0), 0);
        //     car.draw(this.field);
        //     car.moveDown();
        // }, 3000);
    }

    this.update = function() {
        // setInterval(() => {
        //     for(let i=0; i<this.cars.length; i++){
        //         this.cars[i].y+=1;
        //         this.cars[i].move();
        //     }
        // }, 100);
    }


    this.getRandomValue = function(max,min){
        let val = Math.random() * (max - min) + min;
        return Math.round(val);
    }



}


var g = new Game();
g.init('field-1');