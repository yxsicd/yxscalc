
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
        that.rows_show = rows_show;

        var data = rows_show;

        var keys = that.state.data.keys;
        var heads = [];
        for (var i = 0; i < keys.length; i++) {
            heads.push(<th>{that.state.data.keys[i]}</th>);
        }

        var thtr = (
            <tr>
                <th> <input type="checkbox" checked={that.state.allselect} onChange={that.hl_allselect} />

                </th>
                {heads}
            </tr>);

        var trarr = [];

        for (var i = 0; i < rows_show.length; i++) {
            var row = rows_show[i].rowobject;
            var needselect = (that.state.selectlist.indexOf(i) != -1);

            var trtharr = [];
            trtharr.push(
                <td>
                    <input type="checkbox" checked={needselect} data-id= { rows_show[i].index } onChange={that.hl_select} />
                </td>);

            for (var j = 0; j < row.length; j++) {
                trtharr.push(<td>{row[j]}</td>)
            }

            trarr.push(trtharr);

            var etr = row.map((v, i) => {
                return <tr>
                    <td><lable>{keys[j]}</lable></td>
                    <td><input value={row[j]} onChange={that.hl_rowedit} /></td>
                </tr>
            });

            trarr.push(
                <tr>
                    <td colSpan="100">
                        <table className="table table-condensed table-striped table-bordered table-hover">
                            <tbody>
                                {etr}
                            </tbody>
                        </table>
                    </td>
                </tr>
            );

        };


        var ret_table = <table className="table table-condensed table-striped table-bordered table-hover">
            <tbody>
                {thtr}
                {trarr}
            </tbody>
        </table>

        var carr = <div>
            <lable htmlFor="rescount">rescount</lable><input type="text" id="rescount" value={that.state.rescount } onChange={that.hl_rescount} />
            <lable htmlFor="pagesize">pagesize</lable><input type="text" id="pagesize"  value={that.state.page_size} onChange={that.hlPageSize} />
            <lable htmlFor="page">page</lable><input type="text" id="page"  value={that.state.page} onChange={that.hlPage} />
            <lable htmlFor="keyword">keyword</lable><input type="text" id="keyword"  value={that.state.keyword} onChange={that.hlkeyword} />
            {JSON.stringify(that.state.selectlist) }
            {ret_table}
        </div>

        return (carr);
    }
});

// Call React.createFactory instead of directly call ExampleApplication({...}) in React.render
var ExampleApplicationFactory = React.createFactory(ExampleApplication);

ReactDOM.render(
    ExampleApplicationFactory(),
    document.getElementById('container')
);

