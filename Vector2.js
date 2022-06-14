class Vector2{

    x = 0;
    y = 0;

    constructor(x, y){

        this.x = x;
        this.y = y;
    }

    SetVector(x, y){

        this.x = x;
        this.y = y;
    }

    static Add(v1, v2){

        v1.x += v2.x;
        v1.y += v2.y;
    }

    GetMagnitude(){

        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    Normalize(){

        let magnitude = this.GetMagnitude();
        this.x/=magnitude;
        this.y/=magnitude;
    }

}