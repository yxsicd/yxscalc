var ExampleApplication = React.createClass({
    getInitialState: function () {
        var data = {
            keys: ["name", "age", "tag"],
            values: []
        };
        return {
            data: data,
            checklist: [],
            allselect: false,
            page: 1,
            page_size: 8,
            keyword: "",
            rescount: 3000,
            selectlist: []
        };
    },
    hlPageSize: function (event) {
        var ps = parseInt(event.target.value);
        Number.isInteger(ps) ? 0 : ps = 10;
        this.setState({ "page_size": ps });
    },
    hlPage: function (event) {
        var ps = parseInt(event.target.value);
        Number.isInteger(ps) ? 0 : ps = 10;
        this.setState({ "page": ps });
    },
    hlkeyword: function (event) {
        this.setState({ "keyword": event.target.value });
    },
    hl_rescount: function (event) {
        var ps = parseInt(event.target.value);
        Number.isInteger(ps) ? 0 : ps = 100;
        this.setState({ "rescount": ps });
    },
    hl_rowedit: function (event) {
    },
    hl_allselect: function (event) {
        var that = this;
        var ret = [];
        if (event.target.checked) {
            for (var i = 0; i < that.rows_show.length; i++) {
                var row = that.rows_show[i];
                var index = row.index;
                ret.push(index);
            }
        }
        this.setState({
            allselect: event.target.checked,
            selectlist: ret
        });
    },
    hl_select: function (event) {
        var that = this;
        var index = event.target.getAttribute("data-id");
        index = parseInt(index);
        var oldI = that.state.selectlist.indexOf(index);
        if (event.target.checked) {
            if (oldI == -1) {
                that.state.selectlist.push(index);
            }
        }
        else {
            if (oldI != -1) {
                that.state.selectlist.splice(oldI, 1);
            }
        }
        this.setState({
            selectlist: that.state.selectlist
        });
    },
    render: function () {
        var that = this;
        var re = React.createElement;
        that.state.data.values = [];
        for (var i = 0; i < that.state.rescount; i++) {
            that.state.data.values.push(["n" + i, i, "t" + i]);
        }
        var edit_rows = that.state.data.values.map(function (d, i) {
            var jsonvaluestring = JSON.stringify(d);
            var ret = {
                "rowobject": d,
                "jsonvalue": jsonvaluestring,
                "edit": JSON.parse(jsonvaluestring),
                "valid": Array(d.length).fill(false),
                "index": i
            };
            return ret;
        });
        var reg = new RegExp(that.state.keyword);
        var rows_filter = edit_rows.filter(function (d) {
            return reg.test(d.jsonvalue);
        });
        var page = parseInt(that.state.page);
        var page_size = parseInt(that.state.page_size);
        var index = (page - 1) * page_size;
        if (index >= rows_filter.length) {
            var page_end = Math.round(rows_filter.length / page_size);
            that.page = page_end;
            index = (page_end - 1) * page_size;
        }
        if (index < 0) {
            index = 0;
            that.page = 1;
        }
        var rows_show = rows_filter.slice(index, index + page_size);
        that.rows_show = rows_show;
        var data = rows_show;
        var keys = that.state.data.keys;
        var heads = keys.map(function (v, i) {
            return React.createElement("th", null, that.state.data.keys[i]);
        });
        var thtr = (React.createElement("tr", null, React.createElement("th", null, " ", React.createElement("input", {type: "checkbox", checked: that.state.allselect, onChange: that.hl_allselect})), heads));
        var trarr = rows_show.map(function (rs_v, rs_i) {
            var row = rs_v.rowobject;
            var needselect = (that.state.selectlist.indexOf(rs_i) != -1);
            var valuearr = row.map(function (v, i) {
                return React.createElement("td", null, v);
            });
            var tr_value = React.createElement("tr", null, React.createElement("td", null, React.createElement("input", {type: "checkbox", checked: needselect, "data-id": rows_show[rs_i].index, onChange: that.hl_select})), valuearr);
            var etr = row.map(function (v, i) {
                return React.createElement("tr", null, React.createElement("td", null, React.createElement("lable", null, keys[i])), React.createElement("td", null, React.createElement("input", {value: v, onChange: that.hl_rowedit})));
            });
            var tr_edit = React.createElement("tr", null, React.createElement("td", {colSpan: "100"}, React.createElement("table", {className: "table table-condensed table-striped table-bordered table-hover"}, React.createElement("tbody", null, etr))));
            var ret = [tr_value, tr_edit];
            return ret;
        });
        var ret_table = React.createElement("table", {className: "table table-condensed table-striped table-bordered table-hover"}, React.createElement("tbody", null, thtr, trarr));
        var carr = React.createElement("div", null, React.createElement("lable", {htmlFor: "rescount"}, "rescount"), React.createElement("input", {type: "text", id: "rescount", value: that.state.rescount, onChange: that.hl_rescount}), React.createElement("lable", {htmlFor: "pagesize"}, "pagesize"), React.createElement("input", {type: "text", id: "pagesize", value: that.state.page_size, onChange: that.hlPageSize}), React.createElement("lable", {htmlFor: "page"}, "page"), React.createElement("input", {type: "text", id: "page", value: that.state.page, onChange: that.hlPage}), React.createElement("lable", {htmlFor: "keyword"}, "keyword"), React.createElement("input", {type: "text", id: "keyword", value: that.state.keyword, onChange: that.hlkeyword}), JSON.stringify(that.state.selectlist), ret_table);
        return (carr);
    }
});
// Call React.createFactory instead of directly call ExampleApplication({...}) in React.render
var ExampleApplicationFactory = React.createFactory(ExampleApplication);
ReactDOM.render(ExampleApplicationFactory(), document.getElementById('container'));
//# sourceMappingURL=yxs.js.map