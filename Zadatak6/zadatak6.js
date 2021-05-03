var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var gen = document.getElementById("gen");
var draw = document.getElementById("draw");
var inrect = document.getElementById("inrect");
var clr = document.getElementById("clr");
var generatedPoints = new Array();
var rectangle = new Object();

function MakeGrid(P, p, q) {
    let c = getMatrix(p, q);
    let g = new Object();
    g.p = p;
    g.q = q;
    g.x1 = Infinity;
    g.x2 = -Infinity;
    g.y1 = Infinity;
    g.y2 = -Infinity;
    g.c = c;

    for(let i = 0; i < P.length; i++) {
        if(P[i][0] < g.x1) 
            g.x1 = P[i][0];
        if(P[i][0] > g.x2)
            g.x2 = P[i][0];
        if(P[i][1] < g.y1)
            g.y1 = P[i][1];
        if(P[i][1] > g.y2)
            g.y2 = P[i][1];
    }

    if(g.x1 != g.x2)
        g.x2 = g.x2 + p - (g.x2 - g.x1) % p;
    else 
        g.x2++;
    
    if(g.y1 != g.y2)
        g.y2 = g.y2 + q - (g.y2 - g.y1) % q;
    else
        g.y2++;

    let w = (g.x2 - g.x1) / p;
    let h = (g.y2 - g.y1) / q;

    for(let i = 0; i < P.length; i++) {
        let u = 1 + Math.floor((P[i][0] - g.x1) / w);
        let v = 1 + Math.floor((P[i][1] - g.y1) / h);
        g.c[u][v].push(P[i]);
    }

    return g;
}

function RectangularSearch_GridMethod(g, r) {
    let Q = new Array();
    let w = (g.x2 - g.x1) / g.p;
    let h = (g.y2 - g.y1) / g.q;
    let start_i = Math.max(1 + Math.floor((r.x1 - g.x1) / w), 1);
    let end_i = Math.min(1 + Math.floor((r.x2 - g.x1) / w), g.p);
    let start_j = Math.max(1 + Math.floor((r.y1 - g.y1) / h), 1);
    let end_j = Math.min(1 + Math.floor((r.y2 - g.y1) / h), g.q);

    for(let i = start_i; i < end_i; i++) {
        for(let j = start_j; j < end_j; j++) {
            for(let k = 0; k < g.c[i][j].length; k++) {
                let point = g.c[i][j][k];
                if(point[0] >= r.x1 && point[0] <= r.x2 && point[1] >= r.y1 && point[1] <= r.y2) 
                    Q.push(point);
            }
        }
    }
    return Q;
}

function getMatrix(p, q) {
    let c = [];
    for(let i = 0; i < p; i++) {
        c.push([]);
        for(let j = 0; j < q; j++) {
            c[i].push([])
        }
    }
    return c; 
}

function RandomPoints() {
    let numOfPoints = getRandomInt(50, 100);

    while (numOfPoints > 0) {
        let x = getRandomInt(5, 395);
        let y = getRandomInt(5, 395);
        generatedPoints.push([x, y]);
        numOfPoints--;
    }

    drawPoints(generatedPoints, "#ff4d4d");
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function drawPoints(points, color) {
    for (var i = 0; i < points.length; i++) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(points[i][0], points[i][1], 3, 0, 2 * Math.PI);
      ctx.fill();
    }    
}

function drawRectangle() {
    let a = getRandomInt(70, 120);
    let b = getRandomInt(80, 120);
    let x1 = getRandomInt(5, 275);
    let y1 = getRandomInt(5, 275);

    rectangle.x1 = x1;
    rectangle.x2 = x1 + a;
    rectangle.y1 = y1;
    rectangle.y2 = y1 + b;

    let points = [[x1, y1], [x1 + a, y1], [x1 + a, y1 + b], [x1, y1 + b]];
    drawLines(points);
}

function drawLines(P) {
    for (var i = 0; i < P.length - 1; i++)
        Line(P[i][0], P[i][1], P[i + 1][0], P[i + 1][1]);

    Line(
        P[P.length - 1][0],
        P[P.length - 1][1],
        P[0][0],
        P[0][1]
  );
}

function Line(x, y, X, Y) {
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(X, Y);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#1a0000";
    ctx.stroke();
}

function showPointsInRect() {
    let g = MakeGrid(generatedPoints, generatedPoints.length, generatedPoints.length);
    let points = RectangularSearch_GridMethod(g, rectangle);
    drawPoints(points, "#00cc44");
}

gen.onclick = () => {
    RandomPoints();
}

draw.onclick = () => {
    drawRectangle();
}

inrect.onclick = () => {
    showPointsInRect();
}

clr.onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generatedPoints = [];
    rectangle = new Object();
}


