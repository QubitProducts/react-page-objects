/** @jsx React.DOM */

var React = require("react");

var User = React.createClass({
  render: function () {
    return (
      <div className="user">
        <span ref="name">{this.props.user.name}</span>
      </div>
    );
  }
});

module.exports = User;