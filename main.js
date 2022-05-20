"use strict"
//
var frontCanvas = document.getElementById('rayCanvas');
frontCanvas.width = document.body.clientWidth;
frontCanvas.height = document.body.clientWidth;
const frontctx = frontCanvas.getContext('2d', {alpha: false, desynchronized: true})

function main(){
    let incIndex = document.getElementById('incDex').value;
    let refIndex = document.getElementById('refDex').value;
    let incAngle = 90 - document.getElementById('incAngle').value; //Convert to degrees, and the numbers around work I guess

    console.log('yess')

    let refAngle = Math.asin(((incIndex * Math.sin(incAngle*Math.PI / 180))/refIndex))*180/Math.PI
    console.log(refAngle)

    // Create temporary canvas
    let backCanvas = document.createElement('canvas');
    backCanvas.width = frontCanvas.width;
    backCanvas.height = frontCanvas.height;
    let ctx = backCanvas.getContext("2d", {alpha: false, desynchronized: true});
    // Paint over canvas for fresh canvas every time
    ctx.fillStyle = '#4b687e';
    ctx.fillRect(0, 0, backCanvas.width, backCanvas.height);
    
    //Initiate ctx properties for painting lines
    ctx.fillStyle = '#FFFFFF';

    // Paint normal
    ctx.lineWidth = backCanvas.width/400;
    ctx.fillRect(0, backCanvas.height/2, backCanvas.height, ctx.lineWidth);

    //Paint incident ray, starting from the centre
    ctx.lineWidth = backCanvas.width/600;
    ctx.strokeStyle = '#FF0000';
    ctx.beginPath();
    ctx.moveTo(backCanvas.width/2,backCanvas.height/2);
    //ctx.moveTo(100,100)
    //Tan(angle) = opposite / adjacent
    //Math.tan(incAngle) = opposite / backCanvas.height/2
    let opposite = Math.tan(incAngle*Math.PI / 180) * backCanvas.height/2
    ctx.lineTo(backCanvas.width/2-opposite,0);

    ctx.stroke();

    //Paint reflective ray
    ctx.beginPath();
    ctx.moveTo(backCanvas.width/2,backCanvas.height/2);
    //ctx.moveTo(100,100)
    opposite = Math.tan(refAngle*Math.PI / 180) * backCanvas.height/2
    ctx.lineTo(backCanvas.width/2+opposite,backCanvas.height);

    ctx.stroke();

    //Paint final back canvas to front canvas
    frontctx.drawImage(backCanvas, 0, 0);
}

window.onload =function(){
    main()
}