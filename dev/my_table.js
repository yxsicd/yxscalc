
var ExampleApplication = React.createClass({

    getInitialState: function () {
        var data = {
            keys: ["name", "age", "tag"],
            values: []
        }

        return {
            data: data,
            checklist: [],
            allselect: false,
            page: 1,
            page_size: 5,
            keyword: "",
            rescount: 100
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
                "valid": Array(d.length).fill(false)
            };
            return ret;
        });

        var reg = new RegExp(that.state.keyword)
        var rows_filter = edit_rows.filter(function (d) {
            return reg.test(d.jsonvalue);
        });

        var page = parseInt(that.state.page);
        var page_size = parseInt(that.state.page_size);

        var index = (page - 1) * page_size;
        if (index >= rows_filter.length) {
            var page_end = Math.round(rows_filter.length / page_size)
            that.page = page_end;
            index = (page_end - 1) * page_size;
        }
        if (index < 0) {
            index = 0;
            that.page = 1;
        }
        var rows_show = rows_filter.slice(index, index + page_size);


        var data = rows_show;
        var heads = [];

        var trarr = [];
        var tharr = [];

        var keys = that.state.data.keys;

        tharr.push(re("th", { "key": "th_c" },
            re("input", { key: "th_ci", type: "checkbox", onChange: that.hl_allselect })
        ));

        for (var i = 0; i < keys.length; i++) {
            tharr.push(re("th", { "key": "th_" + i }, that.state.data.keys[i]));
        }
        trarr.push(re("tr", { "key": "head" }, tharr));

        for (var i = 0; i < rows_show.length; i++) {
            var row = rows_show[i].rowobject;
            var trtharr = [];
            trtharr.push(re("td", { "key": "td_c" },
                re("input", { key: "td_ci", type: "checkbox", onChange: that.hl_allselect })
            ));
            for (var j = 0; j < row.length; j++) {
                trtharr.push(re("td", { "key": "td_" + i + "_" + j }, row[j]))
            }
            trarr.push(re("tr", { "key": "tr_" + i }, trtharr));

            var etr = [];
            for (var j = 0; j < row.length; j++) {
                var etd = [];
                etd.push(
                    re("td", { "key": j }, re("lable", { key: "l_rc", htmlFor: "ip" }, "count")),
                    re("td", { "key": j + "1" },
                        re("input", { key: j + "1", id: j + "1", value: row[j], onChange: that.hl_rowedit })
                    )
                )
                etr.push(re("tr", { "key": "etr" + j }, etd));
            }
            var edit_table = re("table", { key: "ed_table", className: "table table-condensed table-striped table-bordered table-hover" }, (re("tbody", null, etr)));
            trarr.push(React.createElement("tr", { "key": "tr_e" + i }, re("td", { colSpan: 100 }, edit_table)));

        }

        var mytbody = re("tbody", null, trarr);
        var ret_table = re("table", { key: "ret_table", className: "table table-condensed table-striped table-bordered table-hover" }, mytbody);

        var carr = [];

        carr.push(
            re("lable", { key: "l_rc", htmlFor: "rescount" }, "count"), re("input", { key: "rescount", id: "rescount", value: that.state.rescount, onChange: that.hl_rescount }),
            re("lable", { key: "l_ps", htmlFor: "pagesize" }, "Page Size"), re("input", { key: "pagesize", id: "pagesize", value: that.state.page_size, onChange: that.hlPageSize }),
            re("lable", { key: "l_p", htmlFor: "page" }, "Page"), re("input", { key: "page", id: "page", value: that.state.page, onChange: that.hlPage }),
            re("lable", { key: "l_kw", htmlFor: "keyword" }, "Keyword"), re("input", { key: "keyword", id: "keyword", value: that.state.keyword, onChange: that.hlkeyword }),
            ret_table
        )

        var div = React.createElement("div", null, carr);
        return (div);
    }
});

// Call React.createFactory instead of directly call ExampleApplication({...}) in React.render
var ExampleApplicationFactory = React.createFactory(ExampleApplication);

ReactDOM.render(
    ExampleApplicationFactory(),
    document.getElementById('container')
);

