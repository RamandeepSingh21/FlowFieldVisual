const canvas = window.document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;
Particles = new Array(1000);
flowField = new FlowField(60, canvas.width, canvas.height);
Start();
GameLoop();

function Start(){

    ctx.fillStyle = 'rgb(255, 165, 0)';
    ctx.strokeStyle = 'rgb(255, 165, 0)';    
    
    for(i = 0;i < Particles.length; i++){

        Particles[i] = new Particle(Math.random() * canvas.width, Math.random() * canvas.height, 2);
        Particles[i].SetBoundries(0, canvas.width, 0, canvas.height);
        Particles[i].SetMaxSpeed(3);
        Particles[i].SetAlpha(0.05);
    }
}

function GameLoop(){

    for(i=0;i<Particles.length;i++){

        let forceDir = flowField.GetVector(Particles[i].position.x, Particles[i].position.y);
        forceDir.x * 5;
        forceDir.y * 5;
        Particles[i].AddForce(forceDir);

        Particles[i].Update();
        Particles[i].StayWithinBoundries();
        Particles[i].Show(ctx);
    }
    
    requestAnimationFrame(GameLoop);
}


