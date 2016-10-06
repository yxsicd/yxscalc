var ExampleApplication = React.createClass({
    getInitialState: function () {
        return {
            title: "test",
            data: [{ name: "n1", age: 1 }, { name: "n1", age: 1 }]
        };
    },
    render: function () {
        var that = this;
        var state = that.state;
        var carr = React.createElement("div", null, React.createElement("h1", null, state.title));
        return (carr);
    }
});
// Call React.createFactory instead of directly call ExampleApplication({...}) in React.render
var ExampleApplicationFactory = React.createFactory(ExampleApplication);
ReactDOM.render(ExampleApplicationFactory(), document.getElementById('container'));
//# sourceMappingURL=yxs.js.map