class Background extends MovableObject{
    width=720;
    heigth=400;
    constructor(imagePath , x, y ){
        super().loadImage(imagePath)
        this.x = x;
        this.y = y;

}
}