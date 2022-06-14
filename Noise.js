class Noise{

    baseValues;
    size = 512;
    numberOfOctaves =8;
    dividingFactor = 1;
    noiseValues;
    amplitudeDividingFactor = 0.001;

    Noise1D(x){

        let noiseValue = 0;
        let index = Math.floor(x%this.size);
        let amplitude = this.amplitudeDividingFactor;
        let pitch = this.size * 2;
        this.dividingFactor = 0;

        for(let i=0;i<this.numberOfOctaves;i++){

            amplitude /= this.amplitudeDividingFactor;
            pitch /= 2;
            this.dividingFactor += amplitude;
            let sample1Index = Math.floor(index/pitch) * pitch;
            let sample2Index = (sample1Index + pitch)%this.size;
            let t = (x - sample1Index)/pitch;
            let value = this.GetInterpolatedValue(this.baseValues[sample1Index], this.baseValues[sample2Index], t);
            noiseValue += amplitude * value;
        }

        return noiseValue/this.dividingFactor;
    }

    Noise2D(x, y){

        
        let indexX = Math.floor(x%this.size);
        let indexY = Math.floor(y%this.size);
        let noiseValueX = 0;
        let noiseValueY = 0;
        let amplitude = this.amplitudeDividingFactor;
        let pitch = this.size * 2;
        this.dividingFactor = 0;
        let noiseValue = 0;

        for(let i=0;i<this.numberOfOctaves;i++){

            amplitude /= this.amplitudeDividingFactor;
            pitch/=2;
            this.dividingFactor += amplitude * 2;

            let sampleIndex1 = Math.floor(indexX/pitch) * pitch;
            let sampleIndex2 = (sampleIndex1 + pitch)%this.size;

            let sampleIndex3 = Math.floor(indexY/pitch) * pitch;
            let sampleIndex4 = (sampleIndex3 + pitch)%this.size;

            let t = (indexX - sampleIndex1)/pitch;
            noiseValueX = this.GetInterpolatedValue(this.baseValues[sampleIndex1], this.baseValues[sampleIndex2], t);

            t = (indexY - sampleIndex3)/pitch;
            noiseValueY = this.GetInterpolatedValue(this.baseValues[sampleIndex3], this.baseValues[sampleIndex4], t);
            
            noiseValue += noiseValueX * amplitude + noiseValueY * amplitude;            
        }

        return noiseValue/this.dividingFactor;
    }


    Init1D(){
        
        this.baseValues = new Array(this.size);

        for(let i=0;i< this.baseValues.length;i++){

            this.baseValues[i] = Math.random();
        }        
    }  
    
    Init2D(){
        
        this.baseValues = new Array(this.size * this.size);

        for(let i=0;i< this.baseValues.length;i++){

            this.baseValues[i] = Math.random();
        }        
    }

    GetInterpolatedValue(startValue, endValue, t){
        
        let value = startValue + (endValue - startValue) * (t/1);
        return value;
    }
}