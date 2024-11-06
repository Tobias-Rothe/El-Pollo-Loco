class MovableObject{
    x = 120 ;
    y = 230;
    img;
    height = 200;
    width = 100;
    ImageCache={};
    currentImage = 0;
    speed =0.2;
    otherDirection = false;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;   
        
        
    }
    /** 
    *@param {Array} array-
    */
    loadImages(array){
        array.forEach(path => { 
            let img =new Image();
            img.src = path;
            this.ImageCache[path] = img;
        });
    }

   
     moveRight() {
        console.log("Moving Right");
        
    }
    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;  
        }, 1000 / 60);
    }

    playAnimation(images){
        let i =  this. currentImage % images.length; //let i =  0 % 6 ;  0, rest 0 
        // i = 0,1,2,3,4,5,0,1,2,3....
        let path = images[i];
        this.img = this.ImageCache[path];
        this. currentImage++;

    }
}