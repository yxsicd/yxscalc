var points = [];
var node_width = 10;
var node_height = 10;
var _s = function (data, patharr, value) {
    Array.isArray(patharr) ? 0 : (patharr = patharr.split(","));
    patharr.reduce(function (pv, cv, index, arr) {
        pv[cv] ? 0 : pv[cv] = {};
        if (index == arr.length - 1) {
            pv[cv] = value;
        }
        return pv[cv];
    }, data);
};
var _g = function (data, patharr) {
    return patharr.reduce(function (pv, cv) {
        return (typeof pv == "undefined") ? pv : pv[cv];
    }, data);
};
for (var i = 0; i < 5000; i++) {
    var r = Math.round(i / 140);
    var c = i % 140;
    var po = { x: 20 * (c - 70), y: r * 20 + 100 };
    points.push(po);
}
function getRectArrayString2(ps, w, h) {
    var retnode = [];
    var retlink = [];
    var i, len = ps.length;
    for (i = 0; i < len; i += 1) {
        var node = [];
        node.push("M", ps[i].x, ps[i].y, "m", "-" + w / 2, "-" + h / 2, "l", w, 0, "l", "0", h, "l", "-" + w, 0, "l", 0, "-" + h);
        retnode[i] = { id: i, value: node.join(' ') };
        // retnode.push(node.join(' '))
        if (i < len - 1) {
            var link = [];
            link.push("M", ps[i].x, ps[i].y, "L", ps[i + 1].x, ps[i + 1].y);
            retlink.push(link.join(' '));
        }
    }
    var ret = {
        node: retnode,
        link: retlink
    };
    return ret;
}
var ExampleApplication = React.createClass({
    getInitialState: function () {
        return {
            points: points,
            dragobj: undefined
        };
    },
    onmousedown: function (d) {
        var that = this;
        var x = d.clientX;
        var y = d.clientY;
        var routesvg = d.target;
        var points = that.state.points;
        var len = points.length;
        for (var i = 0; i < len; i++) {
            var po = points[i];
            if ((x - po.x) < node_width / 2 && (y - po.y) < node_height / 2
                && (x - po.x) > -node_width / 2 && (y - po.y) > -node_height / 2) {
                that.setState({ dragobj: i });
                break;
            }
        }
    },
    onmousemove: function (d) {
        var that = this;
        var x = d.clientX;
        var y = d.clientY;
        if (that.state.dragobj) {
            _s(that.state.points, [that.state.dragobj], { x: x, y: y });
            that.setState({ "points": that.state.points });
        }
    },
    onmouseup: function (d) {
        var that = this;
        that.state.dragobj = undefined;
    },
    render: function () {
        var that = this;
        var data = getRectArrayString2(that.state.points, node_width, node_height);
        var mynode = React.createElement("g", null, data.node.map(function (v, i) {
            return React.createElement("path", {key: i, id: 'test', d: v.value, stroke: "black", strokeWidth: "1", fill: "transparent"});
        }));
        var mylink = React.createElement("path", {id: 'test', d: data.link, stroke: "black", strokeWidth: "1", fill: "transparent"});
        return React.createElement("svg", {onMouseUp: that.onmouseup, onMouseMove: that.onmousemove, onMouseDown: that.onmousedown, id: "mysvg", style: { "position": "absolute", "top": "0", "left": "0" }, width: "2000", height: "2000", viewBox: "0 0 2000 2000", xmlns: "http://www.w3.org/2000/svg"}, 
            mynode, 
            mylink);
    }
});
// Call React.createFactory instead of directly call ExampleApplication({...}) in React.render
var ExampleApplicationFactory = React.createFactory(ExampleApplication);
ReactDOM.render(ExampleApplicationFactory(), document.getElementById('mysvgdiv'));
