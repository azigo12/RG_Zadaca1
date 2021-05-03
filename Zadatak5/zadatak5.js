function ClosestPointPair_VeryFast(p) {
    p = p.sort((p1, p2) => p1[0] < p2[0] ? 1 : -1);
    let q = deepCopy(p);
    let pair = ClosestPointPair_VeryFast_Aux(p, q, 1, p.length);
    pair.d = Math.sqrt(pair.d);
    return pair;
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