
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var topo = {};
context.lineWidth = 3;
context.strokeStyle = "#0074D9";
context.lineCap = 'round';
context.lineJoin = "round";
context.globalAlpha = 1;

var n1 = { x: -50, y: 350 };
var n2 = { x: 500, y: 200 };
var n3 = { x: 200, y: 500 };
var n4 = { x: 500, y: 500 };
var n5 = { x: 650, y: 1550 };

var points = [n1, n2, n3, n4, n5];

for (var i = 0; i < 20000; i++) {
  var r = Math.round(i / 140);
  var c = i % 140;

  var po = { x: 20 * (c - 70), y: r * 20 };
  points.push(po);
}

var node_width = 10;
var node_height = 10;

var dragobj;
var dragall;
var temppoint = routesvg.createSVGPoint()

canvas.onmousedown = function (d) {


  var x = d.offsetX;
  var y = d.offsetY;

  temppoint.x = x;
  temppoint.y = y;
  console.log("xx", test.isPointInStroke(temppoint));

  if (d.altKey) {
    var x1 = routesvg.viewBox.baseVal.x;
    var y1 = routesvg.viewBox.baseVal.y;

    dragall = { ox: x1 + 0, oy: y1 + 0, bx: x + 0, by: y + 0 };
    console.log(dragall);
  }
  else {
    var len = points.length;
    for (var i = 0; i < len; i++) {
      var po = points[i];
      if ((x - po.x) < node_width / 2 && (y - po.y) < node_height / 2
        && (x - po.x) > -node_width / 2 && (y - po.y) > -node_height / 2) {
        dragobj = po;
        console.log(dragobj);
        break;
      }
    }
  }


}
canvas.onmousemove = function (d) {
  // console.log(d);
  var x = d.offsetX;
  var y = d.offsetY;
  if (dragobj) {
    dragobj.x = x;
    dragobj.y = y;
  }
  // console.log([x,y]);


  if (d.altKey) {
    if (dragall) {
      var mx = parseInt(x) - parseInt(dragall["bx"]);
      var my = parseInt(y) - parseInt(dragall["by"]);

      // console.log([mx, my]);
      var ox = parseInt(dragall["ox"]);
      var oy = parseInt(dragall["oy"]);

      var w2 = routesvg.width.baseVal.value;
      var h2 = routesvg.height.baseVal.value;

      var ret = (ox + mx * 8) + " " + (oy + my * 8) + " " + w2 + " " + h2 + " ";
      routesvg.setAttribute("viewBox", ret)
    }
  }



}
canvas.onmouseup = function (d) {
  dragobj = undefined;
  dragall = undefined;
}


function getstep(tick, step, count) {
  var nstep = parseInt(new Date().valueOf() / tick) % step;
  return count / step * nstep;
}


function copyargs(defaultargs, args) {
  for (a in args) {
    defaultargs[a] = args[a];
  }
}


function getPathString(ps) {
  var arr = [];
  for (var i = 0; i < ps.length - 1; i++) {

    // var vec={ps[i+1].x-ps[i].x,ps[i+1].y-ps[i].y};

    if (i == 0) {
      arr.push("M", ps[i].x, ps[i].y);
      arr.push("C", ps[i].x, ps[i].y);
    } else {
      arr.push("", ps[i + 1].x, ps[i + 1].y);
      arr.push("", ps[i + 1].x, ps[i + 1].y);
    }
  }
  var ret = arr.join(' ');
  return ret;
}

function getRectString(p, w, h) {
  var arr = ["M", p.x, p.y, "m", "-" + w / 2, "-" + h / 2,
    "l", w, 0, "l", "0", h, "l", "-" + w, 0, "l", 0, "-" + h];
  return arr.join(' ');
}

function getRectArrayString(ps, w, h) {
  var ret = [];
  var i, len = ps.length;
  for (i = 0; i < len; i += 1) {
    ret.push(getRectString(ps[i], w, h));
  }
  return ret.join(' ');
}

function getRectArrayString2(ps, w, h) {
  var retnode = [];
  var retlink = [];
  var i, len = ps.length;

  for (i = 0; i < len; i += 1) {
    retnode.push("M", ps[i].x, ps[i].y, "m", "-" + w / 2, "-" + h / 2,
      "l", w, 0, "l", "0", h, "l", "-" + w, 0, "l", 0, "-" + h);
    if (i < len - 1) {
      retlink.push("M", ps[i].x, ps[i].y, "L", ps[i + 1].x, ps[i + 1].y)
    }
  }
  var ret =
    {
      node: retnode.join(' '),
      link: retlink.join(' ')
    }
  return ret;
}

function checkchange(id, obj) {
  if (!checkchange[id]) {
    checkchange[id] = JSON.stringify(obj);
    return false;
  }
  return JSON.stringify(obj) != checkchange[id];
}


function drawball(p, r) {
  var arr = [];
  arr.push("")
}

function getSVGPath(pathstring) {
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathstring);
  return path;
}

function addSVGPath(pathstring) {
  var path = getSVGPath(pathstring);
  gall.appendChild(path);
  return path;
}


function initdraw() {
  var master = [points[0], points[1], points[4]];
  var backup = [points[0], points[2], points[3], points[4]];
  // context.clearRect(0,0,canvas.width,canvas.height);
  var pathstr = getPathString(master);
  var path = new Path2D(pathstr);
  // context.stroke(path);
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  var path = addSVGPath(pathstr);

  var sl = getstep(30, 100, path.getTotalLength());
  var np = path.getPointAtLength(sl);
  var myd = "M " + np.x + " " + np.y + " m 20 20 l 60 20 l 40 60 z";

  var path_svg1_string = getRectString(np, 4, 4);
  addSVGPath(path_svg1_string);

  var pathstr2 = getPathString(backup);
  //addSVGPath(pathstr2)

  var ret = getRectArrayString2(points, node_width, node_height);
  var nodes = addSVGPath(ret.node)
  topo["node"] = nodes;
  topo["node"].setAttribute("stroke", "red");

  var links = addSVGPath(ret.link)
  topo["link"] = links;
   topo["link"].setAttribute("stroke", "blue");

  var data1 = '<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="2000">' + routesvg.innerHTML +
    '<foreignObject width="100%" height="100%">' +
    '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
    '<em>I</em> like ' +
    '<span style="color:white; text-shadow:0 0 2px blue;">' +
    'cheese</span>' +
    '</div>' +
    '</foreignObject>' +
    '</svg>';

}

function makeimg() {
  var data2 = routesvg.outerHTML;

  var DOMURL = window.URL || window.webkitURL || window;
  var img = new Image();
  var svg = new Blob([data2], { type: 'image/svg+xml;charset=utf-8' });
  var url = DOMURL.createObjectURL(svg);

  img.onload = function () {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, 2000, 2000, 0, 0, 200, 200);
    DOMURL.revokeObjectURL(url);
  }

  img.src = url;
}

initdraw();

function mydraw() {

  if (!checkchange("mypoints", points)) {
    window.requestAnimationFrame(mydraw);
    return;
  }
  var ret = getRectArrayString2(points, node_width, node_height);
  var lastNode = topo["node"].getAttribute("d");
  if (lastNode != ret.node) {
    topo["node"].setAttribute("d", ret.node);
    topo["node"].setAttribute("stroke", "red");
  }

  var lastLink = topo["link"].getAttribute("d");
  if (lastLink != ret.link) {
    topo["link"].setAttribute("d", ret.link);
    topo["link"].setAttribute("stroke", "blue");
    
  }

  //makeimg();
  window.requestAnimationFrame(mydraw);
}
window.requestAnimationFrame(mydraw);