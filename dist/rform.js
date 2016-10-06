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
var ExampleApplication = React.createClass({
    getInitialState: function () {
        var that = this;
        that.s = function (path, value) {
            _s(that.state, path, value);
            that.setState(that.state);
        };
        that.g = function (path) {
            return _g(that.state, path);
        };
        return {
            title: "test",
            columns: ["name", "age"],
            rows: [["n1", 1], ["n2", 2]],
            rows_ex: [],
            columns_ex: [{ sort: "asc" }, { sort: "asc" }],
            table_ex: [],
            allselect: false,
            page: 1,
            page_size: 8,
            keyword: "",
            rescount: 3000
        };
    },
    datachange: function (event) {
        var that = this;
        var target = event.target;
        var patharr = event.target.getAttribute("data-path");
        var value = event.target.type == "checkbox" ? event.target.checked : event.target.value;
        that.s(patharr, value);
    },
    render: function () {
        var that = this;
        var state = that.state;
        var carr = React.createElement("div", null, React.createElement("h1", null, state.title), React.createElement("table", {className: "table table-condensed table-striped table-bordered table-hover"}, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("th", null, React.createElement("input", {type: "checkbox", checked: that.g(["allselect"]), "data-path": ["allselect"], onChange: that.datachange})), state.columns.map(function (v, i) {
            return [
                React.createElement("th", {key: i}, React.createElement("h3", null, that.g(["columns", i])))];
        })), state.rows.map(function (x, i) {
            return [React.createElement("tr", null, React.createElement("td", null, React.createElement("input", {type: "checkbox", checked: that.g(["rows_ex", i, "select"]) ? true : false, "data-path": ["rows_ex", i, "select"], onChange: that.datachange})), x.map(function (y, j) {
                    return React.createElement("td", {key: j}, that.g(["rows", i, j]));
                }))
                    ,
                        React.createElement("tr", null, React.createElement("td", {colSpan: "1000"}, React.createElement("table", {className: "table table-condensed table-striped table-bordered table-hover"}, React.createElement("tbody", null, x.map(function (y, j) {
                            var keypath = ["columns", j];
                            var valuepath = ["rows", i, j];
                            return React.createElement("tr", {key: j}, React.createElement("td", null, React.createElement("lable", null, that.g(keypath))), React.createElement("td", null, React.createElement("input", {type: "text", value: that.g(valuepath), "data-path": valuepath, onChange: that.datachange})));
                        })))))];
        }))));
        return carr;
    }
});
// Call React.createFactory instead of directly call ExampleApplication({...}) in React.render
var ExampleApplicationFactory = React.createFactory(ExampleApplication);
ReactDOM.render(ExampleApplicationFactory(), document.getElementById('container'));
