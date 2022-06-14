class FlowField{

    size;
    fieldVectors;
    noiseValues;
    grid
    constructor(size, canvasWidth, canvasHeight){
        
        this.size = size;
        this.fieldVectors = new Array(size*2);
        this.grid = new Grid(canvasWidth, canvasHeight, size, size);
        let noise = new Noise();
        noise.Init2D();
        let inc = 0.5;
        for(let i=0;i<size;i++){
            for(let j=0;j<size;j++){

                let noiseValue =  noise.Noise2D(i * inc, j * inc);
                noiseValue = noiseValue * 2 * Math.PI;            
                let vector = new Vector2(Math.cos(noiseValue), Math.sin(noiseValue));
                this.fieldVectors[i * (size) + j] = vector;
            }
        }
    }

    ShowVectors(ctx){

        ctx.strokeStyle = 'rgb(255, 255, 255)';

        for(let i=0;i<this.size;i++){
            for(let j=0;j<this.size;j++){

                let index = i *(this.size) + j;
                let startPoint = new Vector2(this.grid.boxes[index].x, this.grid.boxes[index].y);
                let endPoint = new Vector2(startPoint.x + this.fieldVectors[index].x * this.grid.unitSize.x,
                                            startPoint.y + this.fieldVectors[index].y * this.grid.unitSize.y);

                ctx.beginPath();
                ctx.moveTo(startPoint.x, startPoint.y);
                ctx.lineTo(endPoint.x, endPoint.y);
                ctx.stroke();
            }
        }
        
    }

    GetVector(positionX, positionY){

        let xIndex = Math.floor(positionX/this.grid.unitSize.x)%this.size;
        let yIndex = Math.floor(positionY/this.grid.unitSize.y)%this.size;
        
        let index = xIndex * this.size + yIndex;
        return new Vector2(this.fieldVectors[index].x, this.fieldVectors[index].y);
    }
}