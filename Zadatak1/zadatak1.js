var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");
var canvas3 = document.getElementById("canvas3");
var ctx1 = canvas1.getContext("2d");
var ctx2 = canvas2.getContext("2d");
var ctx3 = canvas3.getContext("2d");
ctx1.translate(canvas1.width/2,canvas1.height/2);
ctx2.translate(canvas2.width/2,canvas2.height/2);
ctx3.translate(canvas3.width/2,canvas3.height/2);
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
var clr1 = document.getElementById("clr1");
var clr2 = document.getElementById("clr2");
var clr3 = document.getElementById("clr3");
V = new Array();

function GenerateCurvePoints_Adaptive(phi, psi, tmin, tmax, h, d) {
    let t = tmin;
    let x = phi(t);
    let y = psi(t);
    let x_prim = x;
    let y_prim = y;
    V.push([x, y]);
    
    while (t < tmax) {
        let x_sec = x;
        let y_sec = y;
        x = phi(t + h);
        y = psi(t + h); 

        while ((x - x_sec) * (x - x_sec) + (y - y_sec) * (y - y_sec) > d * d) {
            h *= 0.8;
            x = phi(t + h);
            y = psi(t + h);
        }

        if ((x - x_prim) * (x - x_prim) + (y - y_prim) * (y - y_prim) > d * d * 0.3) {
            V.push([x, y]);
            x_prim = x;
            y_prim = y;
        }

        t += h;
        h *= 1.1;
    }
    V.push([phi(tmax), psi(tmax)]);
    for(i = 0; i < V.length; i++)
        console.log(V[i]);
    return V;
}

function drawPoints(ctx, points, a) {
    for (var i = 0; i < points.length; i++) {
      ctx.fillStyle = "#ff0000";
      ctx.beginPath();
      ctx.arc(points[i][0] * a, points[i][1] * a, 3, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

btn1.onclick = () => {
    points = GenerateCurvePoints_Adaptive(t => t * Math.cos(t), t => t * Math.sin(t), -10, 10, 0.5, 0.5);
    drawPoints(ctx1, points, 20, 20);
    V = [];
  };
  
btn2.onclick = () => {
    points = GenerateCurvePoints_Adaptive(t => 3 * Math.cos(t) + Math.cos(3 * t), t => 3 * Math.sin(t) - Math.sin(3 * t), -10, 10, 0.5, 0.5);
    drawPoints(ctx2, points, 40, 40);
    V = [];
};

btn3.onclick = () => {
    points = GenerateCurvePoints_Adaptive(t => Math.cos(t) * Math.sin(4 * t), t => Math.sin(4 * t) * Math.sin(t), -200, 200, 0.3, 0.5);
    drawPoints(ctx3, points, 200, 200);
    V = [];
};

clr1.onclick = () => {
    ctx1.clearRect(-200, -200, canvas1.width, canvas1.height);
};

clr2.onclick = () => {
    ctx2.clearRect(-200, -200, canvas2.width, canvas2.height);
};

clr3.onclick = () => {
    ctx3.clearRect(-200, -200, canvas3.width, canvas3.height);
};