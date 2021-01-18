function Carousel(){
    this.left = 0;
    this.index = 0;
    this.imageWidth= 600;
    this.processing = false;
    // this.speed = this.imageWidth/60;
    this.speed = (100/60).toFixed(5);
    // this.speed = 100/60;
    this.dots = [];

    this.init = function(carouselId,transitionTime, holdTime){
        this.transitionTime = transitionTime || 1;
        this.holdTime = holdTime || 5;
        this.container = document.getElementById(carouselId);
        this.wrapper = this.container.querySelector('.carousel-image-wrapper');
        this.images = this.wrapper.querySelectorAll('img');
        this.imageCount = this.images.length;
        for(let i=0; i<this.imageCount; i++){
            this.images[i].style.width = 100/this.imageCount + '%';
        }

        // this.wrapper.style.width = this.imageWidth * this.imageCount +'px';
        this.wrapper.style.width = this.imageCount * 100 + '%';
        this.wrapper.style.left = this.left+'%';

        this.dotWrapper = document.createElement('div');
        this.dotWrapper.style.textAlign = "center";
        this.dotWrapper.style.position = "absolute";
        this.dotWrapper.classList.add('dot-wrapper');
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
        
        for(let i=0; i<this.dots.length; i++){
            var that = this;
            this.dots[i].addEventListener('click',function(){
                console.log(this);
                that.goToIndex(i);
            });
            
        }
        
        this.createButtons();
        this.autoSlide();

        // document.addEventListener("visibilitychange", function() {
        //     if (this.autoSlider) {
        //         this.stopSlide();
        //     } 
        //     else {
        //         this.slide();
        //     }
        // });

    }

    this.next = function(){
        if(this.index>=this.imageCount-1){
            this.goToIndex(0);
        }
        else{
            this.goToIndex(this.index+1);
        }
    }
 
    this.previous = function(){
        if(this.index<=0){
            this.goToIndex(this.imageCount-1);
        }
        else{
            this.goToIndex(this.index-1);
        }
    }

    this.goToIndex = function(ind) {
        // let initialIndex = this.index;
        let temp = this.left;
        // this.left = - (ind * this.imageWidth);
        this.left = - (ind * 100);
        let multiple = Math.abs(this.index-ind);
        this.index = ind;

        this.indicate(this.index);

        if(temp<=this.left){
            let x = setInterval(() => {
                
                this.processing = true;
                temp += this.speed * multiple;
                if(temp>=this.left){
                    clearInterval(x);
                    this.processing = false;
                   
                }
                this.wrapper.style.left = temp + '%';
            }, 16.67 * this.transitionTime);
        }
        else{
            let x = setInterval(() => {
                this.processing = true;
                temp -= this.speed * multiple;
                if(temp<=this.left){
                    clearInterval(x);
                    this.processing = false;
                }
                this.wrapper.style.left = temp + '%';
            }, 16.67 * this.transitionTime);
        }
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
        this.nextButton.addEventListener('click', function(e){
            if(!dis.processing){
                dis.next();
            }
            else{
                console.log('processing');
            }
        });

        this.prevButton.addEventListener('click', function(e){
            if(!dis.processing){
                dis.previous();
            }
            else{
                console.log('processing');
            }
        });

        this.container.addEventListener('mouseenter', function(){
            console.log('eneter');
            dis.stopSlide();
        });

        this.container.addEventListener('mouseleave', function(){
            console.log('leave');
            dis.autoSlide();
        });

    }

    this.autoSlide = function(){
        this.autoSlider = setInterval(() => {
            this.next();
        }, 1000*(this.holdTime + this.transitionTime));
    }

    this.stopSlide = function(){
        clearInterval(this.autoSlider);
    }
    this.obj = function(index){
        console.log(this);
    }

}

let c = new Carousel();
c.init('carousel-1',1,3);

let d = new Carousel();
d.init('carousel-2',2,2);
