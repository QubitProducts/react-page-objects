

var React = require("react");

var SelectPage = React.createClass({
  render: function () {
    return (
      <select ref="test" value={this.state.value} onSelect={this.onChange}>
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
        <option value="baz">Baz</option>
      </select>
    );
  },
  getInitialState: function () {
    return {
      value: "foo"
    };
  },
  onChange: function (e) {
    this.setState({
      value: e.target.value
    });
  }
});

module.exports = SelectPage;