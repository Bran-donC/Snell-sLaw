"use strict"
//
var frontCanvas = document.getElementById('rayCanvas');
frontCanvas.width = document.body.clientWidth/2;
frontCanvas.height = document.body.clientWidth/2;
const frontctx = frontCanvas.getContext('2d', {alpha: false, desynchronized: true})

function toDegrees(num){return num*Math.PI/180}
function toReverseDegrees(num){return num*180/Math.PI}

function main(){
    let incIndex = document.getElementById('incDex').value;
    let refIndex = document.getElementById('refDex').value;
    let incAngle = 90 - document.getElementById('incAngle').value; //Convert to degrees, and the numbers around work I guess

    let refAngle = toReverseDegrees(Math.asin(((incIndex * Math.sin(toDegrees(incAngle)))/refIndex)))


    document.getElementById('incAngleText').innerHTML = 'Incident Angle (θ1) ' + incAngle + '°'
    document.getElementById('refAngle').innerHTML = 'Reflective Angle '+Math.round(refAngle*100)/100 + '°'

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
    ctx.fillRect(backCanvas.width/2-ctx.lineWidth/2, 0, ctx.lineWidth, backCanvas.height);

    //Paint incident ray, starting from the centre
    ctx.lineWidth = backCanvas.width/600;
    ctx.strokeStyle = '#00FF00';
    ctx.beginPath();
    ctx.moveTo(backCanvas.width/2,backCanvas.height/2);
    //ctx.moveTo(100,100)
    //Tan(angle) = opposite / adjacent
    //Math.tan(incAngle) = opposite / backCanvas.height/2
    let opposite = Math.tan(toDegrees(incAngle)) * backCanvas.height/2
    ctx.lineTo(backCanvas.width/2-opposite,0);

    ctx.stroke();

    //Paint reflectived ray
    ctx.beginPath();
    ctx.strokeStyle = '#005F00'
    ctx.moveTo(backCanvas.width/2,backCanvas.height/2);
    ctx.lineTo(backCanvas.width/2+opposite,0);

    ctx.stroke();

    //Paint refracted ray
    ctx.beginPath();
    ctx.strokeStyle = '#FF0000'
    ctx.moveTo(backCanvas.width/2,backCanvas.height/2);
    opposite = Math.tan(toDegrees(refAngle)) * backCanvas.height/2
    ctx.lineTo(backCanvas.width/2+opposite,backCanvas.height);

    ctx.stroke();

    //Paint final back canvas to front canvas
    frontctx.drawImage(backCanvas, 0, 0);
}

window.onload =function(){
    main()
}