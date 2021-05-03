var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var gen = document.getElementById("gen");
var draw = document.getElementById("btn");
var clr = document.getElementById("clr");
var generatedPoints = new Array();

function ConvexHull_GrahamScan(P) {
    P = SortPointsByAngle(P);
    let k = 0;
    for(let i = 1; i < P.length; i++) {
        if(P[i][0] != P[i - 1][0] || P[i][1] != P[i - 1][1]) {
            while(k > 0 && ThreePointsCross(P[k - 1], P[k], P[i]) > 0)
                k--;
            k++;
            P[k] = P[i];
        }
    }

    while(P.length > k + 1)
        P.pop();

    return P;
}

function SortPointsByAngle(P) {
    var b = IndexOfLeftMostPoint(P);
    var Q = P[b];
  
    P = P.slice().sort(function (R, S) {
      var a = R[0] - Q[0];
      var b = R[1] - Q[1];
      var c = S[0] - Q[0];
      var d = S[1] - Q[1];
      var e = a * d - b * c;
      if (e != 0) return e > 0 ? 1 : -1;
      return a * a + b * b < c * c + d * d ? 1 : -1;
    });
    return P;
}

function IndexOfLeftMostPoint(P) {
    let b = 1;
    for (let i = 0; i < P.length; i++) {
        if ((P[i][0] < P[b][0]) || (P[i][0] == P[b][0] && P[i][1] < P[b][1]))
            b = i;
    }
    return b;
}

function ThreePointsCross(P1, P2, P3) {
    return (P2[0] - P1[0]) * (P3[1] - P1[1]) - (P3[0] - P1[0]) * (P2[1] - P1[1]);
}

function RandomPoints() {
    let numOfPoints = getRandomInt(50, 100);

    while (numOfPoints > 0) {
        let x = getRandomInt(5, 395);
        let y = getRandomInt(5, 395);
        generatedPoints.push([x, y]);
        numOfPoints--;
    }

    drawPoints();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function drawPoints() {
    for (var i = 0; i < generatedPoints.length; i++) {
      ctx.fillStyle = "#ff0000";
      ctx.beginPath();
      ctx.arc(generatedPoints[i][0], generatedPoints[i][1], 3, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.stroke();
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
  P = [];
  generatedPoints = [];
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

gen.onclick = () => {
    RandomPoints();
}

clr.onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generatedPoints = [];
};

draw.onclick = () => {
    var points = ConvexHull_GrahamScan(generatedPoints);
    drawLines(points);
}


