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
    this.transitionTime = 2;
    this.speed = this.imageWidth/60;
    this.holdtime = 5;
    // this.dots = [];
    this.init = function(){
        this.wrapper = document.getElementsByClassName('carausel-image-wrapper')[0];
        this.wrapper.style.width = this.imageWidth * this.imageCount +'px';
        this.wrapper.style.left = this.left+'px';

        this.container = document.getElementsByClassName('carausel-container')[0];

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
            this.dotWrapper.appendChild(dot);
        }
        this.dots = document.getElementsByClassName('dot');
        // console.log(this.dots);
        for(let i=0; i<this.dots.length; i++){
            var that = this;
            this.dots[i].addEventListener('click',function(){
                console.log(this);
                that.goToIndex(i);
            });
            
        }
        


    }

    this.next = function(){
        //if(this.left<=-600){
        if(this.left <= -((this.imageCount-1)*this.imageWidth)){
            let temp = this.left;
            this.left = 0;
            this.index = 0;

            this.indicate(this.index);
            var x = setInterval(() => {

                temp += this.speed * (this.imageCount-1);
                if(temp>=this.left){
                    clearInterval(x);
                }
                this.wrapper.style.left = temp + 'px';
            }, 16.67*this.transitionTime);

        }
        else{
            let temp = this.left;
            this.left -= this.imageWidth;
            this.index++;
            this.indicate(this.index);
            // this.dots[this.index].classList.add('active');
            //interval
            var x = setInterval(() => {
                temp -= this.speed;
                if(temp<=this.left){
                    clearInterval(x);
                }
                this.wrapper.style.left = temp + 'px';
            }, 16.67 * this.transitionTime);
        }
        // this.index = (this.index+1)%imageCount;
        // this.wrapper.style.left = this.left + 'px';
        console.log(this.index);
    }
    this.previous = function(){
        if(this.left >= 0){
            let temp = this.left;
            this.left = -((this.imageCount-1)*this.imageWidth);
            this.index = this.imageCount-1;


            this.indicate(this.index);
            var x = setInterval(() => {
                temp -= this.speed * (this.imageCount-1);
                if(temp<=this.left){
                    clearInterval(x);
                }
                this.wrapper.style.left = temp + 'px';
            }, 16 * this.transitionTime);
        }
        else{
            let temp = this.left;
            this.left += this.imageWidth;
            this.index--;

            this.indicate(this.index);

            var x = setInterval(() => {
                temp += this.speed;
                if(temp>=this.left){
                    clearInterval(x);
                }
                this.wrapper.style.left = temp + 'px';
            }, 16 * this.transitionTime);
        }
        
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
            var x = setInterval(() => {
                temp += this.speed * multiple;
                if(temp>=this.left){
                    clearInterval(x);
                }
                this.wrapper.style.left = temp + 'px';
            }, 16 * this.transitionTime);
        }
        else{
            var x = setInterval(() => {
                temp -= this.speed * multiple;
                if(temp<=this.left){
                    clearInterval(x);
                }
                this.wrapper.style.left = temp + 'px';
            }, 16 * this.transitionTime);
        }

        // var x = setInterval(() => {
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
    this.obj = function(index){
        console.log(this);
    }

}

var c = new Carausel();
c.init();


var imgContainer = document.getElementsByClassName('carausel-container')[0];
var nextButton = document.createElement('a');
nextButton.classList.add('next');
nextButton.innerHTML = "&#10095;";
// nextButton.style.position = "absolute";
imgContainer.appendChild(nextButton);

var prevButton = document.createElement('a');
prevButton.classList.add('prev');
prevButton.innerHTML = "&#10094;";
// prevButton.style.position = "absolute";
imgContainer.appendChild(prevButton);

// var nextButton = document.getElementsByClassName('next-btn')[0];
nextButton.addEventListener('click', function(){
    console.log('click');
    c.next();
   
});
// var prevButton = document.getElementsByClassName('prev-btn')[0];
prevButton.addEventListener('click', function(){
    console.log('click');
    c.previous();
})