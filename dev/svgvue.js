var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var points = [];
var node_width = 10;
var node_height = 10;

for (var i = 0; i <5000; i++) {
  var r = Math.round(i / 140);
  var c = i % 140;

  var po = { x: 20 * (c - 70), y: r * 20+100 };
  points.push(po);
}

function getRectArrayString2(ps, w, h) {
  var retnode = [];
  var retlink = [];
  var i, len = ps.length;

  for (i = 0; i < len; i += 1) {
    var node = [];
      node.push("M", ps[i].x, ps[i].y, "m", "-" + w / 2, "-" + h / 2,
      "l", w, 0, "l", "0", h, "l", "-" + w, 0, "l", 0, "-" + h);
      retnode[i] = {id:i,value:node.join(' ') };
      // retnode.push(node.join(' '))
      if (i < len - 1) {
        var link = [];
        link.push("M", ps[i].x, ps[i].y, "L", ps[i + 1].x, ps[i + 1].y);
        retlink.push(link.join(' '));
    }
  }
  var ret =
    {
      node: retnode,
      link: retlink
    }
  return ret;
}

var m_table = new Vue({
  el: '#routesvg',
  data: {
    points: points,
    node_width: node_width,
    node_height: node_height
  },
  methods: {
  },
  computed: {

    pathall: function () {
      var that = this;
      var ret = getRectArrayString2(that.points, that.node_width, that.node_height);
      return ret;
    }
    ,
    nodePath: function () {
      var that = this;
      return that.pathall.node;
    }
    ,
    linkPath: function () {
      var that = this;
      return that.pathall.link;
    }
    // ,
    // allnode: function () { 
    //   var that = this;
    //   ret = '<path id="node" d="' + that.pathall.node + '" stroke="red" fill="green"/>';
    //   ret2 = '<path id="node" d="' + that.pathall.link + '" stroke="red" fill="green"/>';
    //   return ret+ret2;
    // }
  }
})



var dragobj;
var dragall;


canvas.onmousedown = function (d) {
  var x = d.offsetX;
  var y = d.offsetY;

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
