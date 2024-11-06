class MovableObject{
    x = 120 ;
    y = 230;
    img;
    height = 200;
    width = 100;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;   
        
        
    }
     moveRight() {
        console.log("Moving Right");
        
    }
    movingLeft(){

    }
}