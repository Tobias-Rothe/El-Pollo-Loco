class Cloud extends MovableObject{
    y =10;
    width=700;
   height=350;
    constructor(){
        super().loadImage('../img//5_background/layers/4_clouds/1.png')
       this.x= Math.random()* 500
      
    }
   
}