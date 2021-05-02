var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var draw = document.getElementById("btn1");
var clear = document.getElementById("clr1");
var points = new Array();

function GenerateBezierCurvePoints(P, n) {
    let t = 0;
    let delta_t = 1 / n;
    let p_len = P.length;
    let points = new Array();

    for(var i = 0; i <= n; i++) {
        let x = 0;
        let y = 0;

        for(var j = 0; j < p_len; j++) {
            x += P[j][0] * binomial(p_len - 1, j) * Math.pow(t, j) * Math.pow(1 - t, p_len - 1 - j);
            y += P[j][1] * binomial(p_len - 1, j) * Math.pow(t, j) * Math.pow(1 - t, p_len - 1 - j);
        }

        points.push([x, y]);
        t += delta_t;
    }
    
    return points;
}

function binomial(n, k) {
   var coeff = 1;
   for (var x = n-k+1; x <= n; x++) coeff *= x;
   for (var x = 1; x <= k; x++) coeff /= x;
   return coeff;
}

function drawPoints(p) {
    var ctx = canvas.getContext("2d");
    for (var i = 0; i < p.length; i++) {
      ctx.fillStyle = "#ff0000";
      ctx.beginPath();
      ctx.arc(p[i][0], p[i][1], 3, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.stroke();
}

function drawLines(P) {
    for (var i = 0; i < P.length - 1; i++)
        Line(P[i][0], P[i][1], P[i + 1][0], P[i + 1][1]);
}

function Line(x, y, X, Y) {
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(X, Y);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ff4dff";
    ctx.stroke();
}

function drawPoint(canvas, e) {
    var ctx = canvas.getContext("2d");
    var pos = getMousePosition(canvas, e);
  
    ctx.fillStyle = "#800080";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 3, 0, 2 * Math.PI);
    ctx.fill();
  
    points.push([pos.x, pos.y]);
}

function getMousePosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
}

canvas.addEventListener(
    "click",
    function (e) {
      drawPoint(canvas, e);
    },
    false
);

btn1.onclick = () => {
    var numOfPoints = document.getElementById("numOfPoints");
    let bezierCurvePoints = GenerateBezierCurvePoints(points, numOfPoints.value);
    drawLines(bezierCurvePoints);
    drawPoints(bezierCurvePoints);
}

clr1.onclick = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    points = [];
};