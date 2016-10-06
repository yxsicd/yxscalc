var _s = function (data, patharr, value) {
    Array.isArray(patharr) ? 0 : (patharr = patharr.split(","));
    patharr.reduce(function (pv, cv, index, arr) {
        pv[cv] ? 0 : pv[cv] = {};
        if (index == arr.length - 1) {
            pv[cv] = value;
        }
        return pv[cv];
    }, data)
}

var _g = function (data, patharr) {
    return patharr.reduce(function (pv, cv) {
        return (typeof pv == "undefined")?pv:pv[cv]
    }, data)
}

var ExampleApplication = React.createClass({

    getInitialState: function () {
        var that = this;
        that.s = function (path, value) {
            _s(that.state, path, value);
            that.setState(that.state);
        };
        that.g = function (path) {
            return _g(that.state, path);
        }

        return {
            title: "test",
            columns: ["name", "age"],
            rows: [["n1", 1], ["n2", 2]],
            rows_ex: [],
            columns_ex: [{ sort: "asc" }, { sort: "asc" }],
            table_ex:[],
            allselect: false,
            page: 1,
            page_size: 8,
            keyword: "",
            rescount: 3000
        }
    },

    datachange: function (event) {
        var that = this;
        var target = event.target;
        var patharr = event.target.getAttribute("data-path");
        var value = event.target.type == "checkbox" ? event.target.checked : event.target.value;
        that.s(patharr, value);
    }    


    render: function () {
        var that = this;
        var state = that.state;

        var carr = <div>
            <h1>{state.title}</h1>
            <table className="table table-condensed table-striped table-bordered table-hover">
                <tbody>
                    <tr>
                        <th>
                            <input type="checkbox" checked={that.g(["allselect"]) } data-path={["allselect"]} onChange={that.datachange} />
                        </th>
                        {
                            state.columns.map((v, i) => {
                                return [
                                    <th key={i}>
                                        <h3>{that.g(["columns", i]) }</h3>
                                    </th>]
                            })
                        }
                    </tr>

                    {
                        state.rows.map((x, i) => {
                            return [<tr>
                                <td>
                                    <input type="checkbox" checked={that.g(["rows_ex", i, "select"])?true:false } data-path={["rows_ex", i, "select"]} onChange={that.datachange} />
                                </td>
                                {
                                    x.map((y, j) => {
                                        return <td key={j}>{that.g(["rows", i, j]) }</td>
                                    })
                                }
                            </tr>
                                <tr>
                                    <td colSpan="1000">
                                        <table className="table table-condensed table-striped table-bordered table-hover">
                                            <tbody>
                                                {
                                                    x.map((y, j) => {
                                                        var keypath = ["columns", j];
                                                        var valuepath = ["rows", i, j];
                                                        return <tr key={j}>
                                                            <td>
                                                                <lable>{that.g(keypath) }</lable>
                                                            </td>
                                                            <td>
                                                                <input type="text" value={that.g(valuepath) } data-path={valuepath} onChange={that.datachange} />
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>]
                        })
                    }
                </tbody>
            </table>
        </div>

        return carr;


    }
});

// Call React.createFactory instead of directly call ExampleApplication({...}) in React.render
var ExampleApplicationFactory = React.createFactory(ExampleApplication);

ReactDOM.render(
    ExampleApplicationFactory(),
    document.getElementById('container')
);

