class MovableObject{
    x = 120 ;
    y = 230;
    img;
    height = 200;
    width = 100;
    ImageCache={};
    currentImage = 0;
    speed =0.2;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;   
        
        
    }
    
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
}