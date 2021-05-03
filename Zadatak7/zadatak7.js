var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var gen = document.getElementById("gen");
var draw = document.getElementById("draw");
var inrect = document.getElementById("inrect");
var clr = document.getElementById("clr");
var generatedPoints = new Array();
var rectangle = new Object();

function Make2dTree(p) {
    let h = new treeNode(p[0], null, null);

    for(let i = 1; i < p.length; i++) {
        let f = false; 
        let c = h;
        let d;
        let p1;

        while(c !== null) {
            p1 = c;
            d = (f && p[i][0] < c.p[0]) || (!f && p[i][1] < c.p[1]);
            if(d)
                c = c.l;
            else    
                c = c.r;
            f = !f;
        }

        c = new treeNode(p[i], null, null);
        if(d)
            p1.l = c;
        else    
            p1.r = c;

    }
    return h;
}

function RectangularSearch_2dTree(t, r) {
    let v = new Array();
    RectangularSearch_2dTree_Aux(t, r, v, false);
    return v;
}

function RectangularSearch_2dTree_Aux(t, r, v, f) {
    if(t !== null) {
        if(t.p[0] >= r.x1 && t.p[0] <= r.x2 && t.p[1] >= r.y1 && t.p[1] <= r.y2)
            v.push(t.p);
        if ((f && r.x1 < t.p[0]) || (!f && r.y1 < t.p[1]))
            RectangularSearch_2dTree_Aux(t.l, r, v, !f);
        if ((f && r.x2 >= t.p[0]) || (!f && r.y2 >= t.p[1]))
            RectangularSearch_2dTree_Aux(t.r, r, v, !f);
    }
}

function treeNode(p, l, r) {
    var obj = {
        p: p,
        l: l,
        r: r,
    };
    return obj;
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
    let t = Make2dTree(generatedPoints);
    let points = RectangularSearch_2dTree(t, rectangle);
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


