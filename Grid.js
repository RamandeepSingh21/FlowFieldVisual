class Grid{

    gridSize = new Vector2(0, 0);
    gridDivisions = new Vector2(0, 0);
    unitSize = new Vector2(0, 0);
    boxes;

    constructor(sizeX, sizeY, divisionsX, divisionsY){

        this.gridSize.SetVector(sizeX, sizeY);
        this.gridDivisions.SetVector(divisionsX, divisionsY);
        this.unitSize.SetVector(sizeX/divisionsX, sizeY/divisionsY);
        this.boxes = new Array(divisionsX * divisionsY);

        let x = 0;
        let y = 0;
        this.boxes[0] = {x: x, y: y};
        console.log(this.unitSize.x, this.unitSize.y);

        for(let i=0;i < this.gridDivisions.x;i++){
            for(let j=0;j<this.gridDivisions.y;j++){

                x = (i%this.gridDivisions.x) * this.unitSize.x;
                y = (j%this.gridDivisions.y) * this.unitSize.y;

                this.boxes[i * this.gridDivisions.y + j] = {x : x, y : y};
            }
        }
    }

    DrawGrid(ctx, brightnessValues){

        for(let i=0;i< this.boxes.length;i++){

            let brightness = brightnessValues[i];
            ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
            ctx.fillRect(this.boxes[i].x, this.boxes[i].y, this.unitSize.x, this.unitSize.y);
        }
    }
}