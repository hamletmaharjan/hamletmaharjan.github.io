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
        // this.rightBtn = document.createElement('BUTTON');  
        // this.text = document.createTextNode("next"); 
            
        // // appending text to button 
        // this.rightBtn.appendChild(this.text); 
            
        // // appending button to div 
        
        // this.rightBtn.innerHTML = "next";
        // this.rightBtn.style.position = 'absolute';
        // this.rightBtn.style.right = '5px';
        // this.rightBtn.style.top= '100px';
        // this.container.appendChild(this.rightBtn);


    }

    this.next = function(){
        //if(this.left<=-600){
        if(this.left <= -((this.imageCount-1)*this.imageWidth)){
            this.left = 0;
            this.index = 0;
        }
        else{
            this.left -= this.imageWidth;
            this.index++;
            // var x = setInterval(() => {
            //     this.left -= 5;
            //     this.wrapper.style.left = this.left + 'px';
            // }, 16);
        }
        // this.index = (this.index+1)%imageCount;
        this.wrapper.style.left = this.left + 'px';
        console.log(this.index);
    }
    this.previous = function(){
        if(this.left >= 0){
            this.left = -((this.imageCount-1)*this.imageWidth);
            this.index = this.imageCount-1;
        }
        else{
            this.left += this.imageWidth;
            this.index--;
        }
        
        this.wrapper.style.left = this.left + 'px';
        console.log(this.index);
    }

    this.goToIndex = function(ind) {
        this.left = - (ind * this.imageWidth);
        this.wrapper.style.left = this.left + 'px';
        this.index = ind;
        console.log(this.index);
    }
    this.obj = function(index){
        console.log(this);
    }

}

var c = new Carausel();
c.init();

var nextButton = document.getElementsByClassName('next-btn')[0];
nextButton.addEventListener('click', function(){
    console.log('click');
    c.next();
   
});
var prevButton = document.getElementsByClassName('prev-btn')[0];
prevButton.addEventListener('click', function(){
    console.log('click');
    c.previous();
})