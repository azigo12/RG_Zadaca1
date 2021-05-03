var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var gen = document.getElementById("gen");
var find = document.getElementById("btn");
var clr = document.getElementById("clr");
var text = document.getElementById("closest");
var generatedPoints = new Array();

function ClosestPointPair_VeryFast(p) {
    p = p.sort((p1, p2) => p1[0] < p2[0] ? 1 : -1);
    let q = deepCopy(p);
    let pair = ClosestPointPair_VeryFast_Aux(p, q, 0, p.length - 1);
    pair.d = Math.sqrt(pair.d);
    return pair;
}

function ClosestPointPair_VeryFast_Aux(p, q, p1, q1) {
    if(q1 <= p1)
        return pair(Infinity, p[p1], p[p1]);

    let r = Math.floor((p1 + q1 - 1) / 2);
    let firstPair = ClosestPointPair_VeryFast_Aux(q, p, p1, r);
    let secondPair = ClosestPointPair_VeryFast_Aux(q, p, r + 1, q1);

    if(secondPair.d < firstPair.d) {
        firstPair.d = secondPair.d;
        firstPair.u = secondPair.u;
        firstPair.v = secondPair.v;
    }

    let c = (q[r][0] + q[r + 1][0]) / 2;
    Merge_By_y_Aux(p, q, p1, q1, r);
    let s = new Array();
    let m = 0;

    for(let k = p1; k <= q1; k++) {
        if(q[k][0] >= c - firstPair.d && q[k][0] <= c + firstPair.d) {
            let end_i = Math.min(m, 4);
            for(let i = 1; i < end_i; i++) {
                let j = s[i];
                let w = (q[k][0] - q[j][0]) * (q[k][0] - q[j][0]) + (q[k][1] - q[j][1]) * (q[k][1] - q[j][1]);
                if(w < firstPair.d) {
                    firstPair.d = w;
                    firstPair.u = q[k];
                    firstPair.v = q[j];
                }
            }
            s[m % 4] = k;
            m++;
        }
    }

    return firstPair;
}

function Merge_By_y_Aux(p, q, p1, q1, r) {
    let i = p1;
    let j = r + 1;
    let k = p1;

    while(i != r + 1 && j != q1 + 1) {
        if(p[i][1] < p[j][1]) {
            q[k] = p[i];
            i += 1;
        }
        else {
            q[k] = p[j];
            j += 1;
        }
        k += 1;
    }

    while(i != r + 1) {
        q[k] = p[i];
        i += 1;
        k += 1;
    }
    
    while(j != q1 + 1) {
        q[k] = p[j];
        j += 1;
        k += 1;
    }
}

function deepCopy(p) {
    let q = new Array();
    for(let i = 0; i < p.length; i++)
        q.push(p[i]);
    return q;
}

function pair(d, u, v) {
    var obj = {
        d: d,
        u: u,
        v: v
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

    drawPoints(generatedPoints, "#ff0000");
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

function Line(x, y, X, Y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(X, Y);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#3240a8";
    ctx.stroke();
}

gen.onclick = () => {
    RandomPoints();
}

clr.onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generatedPoints = [];
    text.innerHTML = ""; 
};

find.onclick = () => {
    let result = ClosestPointPair_VeryFast(generatedPoints);
    Line(result.u[0], result.u[1], result.v[0], result.v[1]);
    text.style.color = "#3240a8";
    text.style.fontWeight = 'bold';
    text.innerHTML = "The closest pair of points is (" + result.u + ") and (" + result.v + ")."; 
    drawPoints([result.u, result.v], "#3240a8");
    ctx.stroke();
}