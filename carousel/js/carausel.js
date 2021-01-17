// for (var i = 0; i < 10; i++) {
//   setTimeout((function display(i) {
//     return function runFn() {
//       console.log(i);
//     }
//   })(i), 1000);
// }
// var wrapper = document.getElementsByClassName('carausel-wrapper')[0];
// // wrapper.style.left = '-500px';
// console.log(wrapper);

function Carausel(){
    this.left = 0;
    this.index = 0;
    this.imageCount = 3;
    this.imageWidth= 600;
    // this.transitionTime = 2;
    this.speed = this.imageWidth/60;
    // this.speed = 100/60;
    // this.holdTime = 5;
    this.dots = [];
    this.init = function(carauselId,transitionTime, holdTime){
        this.transitionTime = transitionTime || 1;
        this.holdTime = holdTime || 5;

        // this.container = document.getElementsByClassName('carausel-container')[0];

        // this.wrapper = document.getElementsByClassName('carausel-image-wrapper')[0];

        this.container = document.getElementById(carauselId);
        this.wrapper = this.container.querySelector('.carausel-image-wrapper');
        // this.images = this.wrapper.querySelectorAll('img');
        // for(let i=0; i<this.imageCount; i++){
        //     this.images[i].style.width = 100/this.imageCount + '%';
        // }
        // console.log(this.container, this.wrapper);

        this.wrapper.style.width = this.imageWidth * this.imageCount +'px';
        this.wrapper.style.width = this.imageCount * 100 + '%';
        this.wrapper.style.left = this.left+'px';

        

        this.dotWrapper = document.createElement('div');
        this.dotWrapper.style.textAlign = "center";
        this.dotWrapper.style.position = "absolute";
        this.dotWrapper.classList.add('dot-wrapper');
        // this.dotWrapper.style.left = "50%";
        this.dotWrapper.style.bottom = "5px";
        this.container.appendChild(this.dotWrapper);

        for(var i=0; i<this.imageCount; i++){
            var dot = document.createElement('span');
            dot.classList.add('dot');
            if(i==0){
                dot.classList.add('active');
            }
            this.dotWrapper.appendChild(dot);
            this.dots.push(dot);
        }
        // this.dots = document.getElementsByClassName('dot');
        // console.log(this.dots);
        for(let i=0; i<this.dots.length; i++){
            var that = this;
            this.dots[i].addEventListener('click',function(){
                console.log(this);
                that.goToIndex(i);
            });
            
        }
        // var imgContainer = document.getElementsByClassName('carausel-container')[0];
        
        this.createButtons();
        
        // setInterval(() => {
        //     this.next();
        // }, 1000*this.holdTime);

    }

    this.next = function(){
        if(this.index>=2){
            this.goToIndex(0);
        }
        else{
            this.goToIndex(this.index+1);
        }
        //if(this.left<=-600){
        // if(this.left <= -((this.imageCount-1)*this.imageWidth)){
        //     let temp = this.left;
        //     this.left = 0;
        //     this.index = 0;

        //     this.indicate(this.index);
        //     let x = setInterval(() => {

        //         temp += this.speed * (this.imageCount-1);
        //         if(temp>=this.left){
        //             clearInterval(x);
        //         }
        //         this.wrapper.style.left = temp + 'px';
        //     }, 16.67*this.transitionTime);

        // }
        // else{
        //     let temp = this.left;
        //     this.left -= this.imageWidth;
        //     this.index++;
        //     this.indicate(this.index);
        //     // this.dots[this.index].classList.add('active');
        //     //interval
        //     let x = setInterval(() => {
        //         temp -= this.speed;
        //         if(temp<=this.left){
        //             clearInterval(x);
        //         }
        //         this.wrapper.style.left = temp + 'px';
        //     }, 16.67 * this.transitionTime);
        // }
        // this.index = (this.index+1)%imageCount;
        // this.wrapper.style.left = this.left + 'px';
        console.log(this.index);
    }
    this.previous = function(){
        if(this.index<=0){
            this.goToIndex(this.imageCount-1);
        }
        else{
            this.goToIndex(this.index-1);
        }
        // if(this.left >= 0){
        //     let temp = this.left;
        //     this.left = -((this.imageCount-1)*this.imageWidth);
        //     this.index = this.imageCount-1;


        //     this.indicate(this.index);
        //     this.x = setInterval(() => {
        //         temp -= this.speed * (this.imageCount-1);
        //         if(temp<=this.left){
        //             clearInterval(this.x);
        //         }
        //         this.wrapper.style.left = temp + 'px';
        //     }, 16 * this.transitionTime);
        // }
        // else{
        //     let temp = this.left;
        //     this.left += this.imageWidth;
        //     this.index--;

        //     this.indicate(this.index);

        //     let x = setInterval(() => {
        //         temp += this.speed;
        //         if(temp>=this.left){
        //             clearInterval(x);
        //         }
        //         this.wrapper.style.left = temp + 'px';
        //     }, 16 * this.transitionTime);
        // }
        
        // this.wrapper.style.left = this.left + 'px';
        console.log(this.index);
    }

    this.goToIndex = function(ind) {
        // let initialIndex = this.index;
        let temp = this.left;
        this.left = - (ind * this.imageWidth);
        // console.log(this.index, ind, Math.abs(this.index-ind));
        let multiple = Math.abs(this.index-ind);
        this.index = ind;

        this.indicate(this.index);

        if(temp<=this.left){
            let x = setInterval(() => {
                temp += this.speed * multiple;
                if(temp>=this.left){
                    clearInterval(x);
                }
                this.wrapper.style.left = temp + 'px';
            }, 16 * this.transitionTime);
        }
        else{
            let x = setInterval(() => {
                temp -= this.speed * multiple;
                if(temp<=this.left){
                    clearInterval(x);
                }
                this.wrapper.style.left = temp + 'px';
            }, 16 * this.transitionTime);
        }

        // let x = setInterval(() => {
        //     temp -= this.speed * this;
        //     if(temp<=this.left){
        //         clearInterval(x);
        //     }
        //     this.wrapper.style.left = temp + 'px';
        // }, 16 * this.transitionTime);
        // this.wrapper.style.left = this.left + 'px';
        console.log(this.index);
    }

    this.indicate = function(ind){
        for(let i=0; i<this.dots.length; i++){
            this.dots[i].classList.remove("active");
        }
        this.dots[ind].classList.add("active");
    }

    this.createButtons = function() {
        this.nextButton = document.createElement('a');
        this.nextButton.classList.add('next');
        this.nextButton.innerHTML = "&#10095;";
        this.container.appendChild(this.nextButton);

        this.prevButton = document.createElement('a');
        this.prevButton.classList.add('prev');
        this.prevButton.innerHTML = "&#10094;";
        this.container.appendChild(this.prevButton);

        let dis = this;
        this.nextButton.addEventListener('click', function(){
            console.log('click');
            dis.next();
        
        });
        this.prevButton.addEventListener('click', function(){
            console.log('click');
            dis.previous();
        });
        console.log(this.prevButton, this.nextButton);

    }
    this.obj = function(index){
        console.log(this);
    }

}

let c = new Carausel();
c.init('carousel-1',2,4);


// let d = new Carausel();
// d.init('carousel-2',1,6);
